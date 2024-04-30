<template>
    <div class="grid gap-4">
        <div class="flex items-center justify-between border-b">
            <H2 class="pt-2">
                {{ gyrnalWorkout && gyrnalWorkout.id ? 'Edit Workout' : 'New Workout' }}
            </H2>
            <div class="flex flex-wrap gap-2">
                <Button
                    variant="outline"
                    @click="dialogStore.showDialog('assign-template')"
                >
                    <NotepadTextDashed class="size-4" />
                    Load template
                </Button>
                <Button
                    variant="default"
                    :disabled="loading"
                    @click="save"
                >
                    <Loader2
                        v-if="loading"
                        class="size-4 animate-spin"
                    />
                    <Save
                        v-else
                        class="size-4"
                    />
                    Save
                </Button>
            </div>
        </div>

        <div
            v-if="workout"
            class="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
            <TextInput
                v-model="workoutType"
                label="Workout type"
                description="Push, pull, legs, ..."
                class="md:col-span-2"
            />
            <TextInput
                v-model="workout.startedAt"
                type="datetime-local"
                label="Started at"
                description="Was probably set automatically..."
            />
            <TextInput
                v-model="workout.finishedAt"
                type="datetime-local"
                label="Finished at"
                description="Will be automatically updated on create."
            />
            <TextAreaInput
                v-model="workout.notes"
                label="Notes"
                class="md:col-span-2"
            />
        </div>

        <div
            v-if="workout"
            class="grid grid-cols-1 gap-4"
        >
            <H3>Movements</H3>

            <draggable
                :animation="200"
                :component-data="{
                    type: 'transition-group',
                    name: !dragging ? 'flip-list' : null,
                }"
                group="movements"
                ghost-class="bg-muted"
                handle=".handle"
                tag="transition-group"
                :list="workout.movements"
                @start="dragging = true"
                @end="dragging = false"
            >
                <EditMovement
                    v-for="movement, index in workout.movements"
                    :key="index"
                    class="my-4"
                    :movement="movement"
                    :index="index"
                    @add-performance="addPerformance"
                    @remove-performance="removePerformance"
                    @try-remove="tryRemoveMovement"
                />
            </draggable>

            <div class="flex gap-4">
                <Button @click="dialogStore.showDialog('add-movement')">
                    <Plus class="size-4" />
                    Add Movement
                </Button>
                <Button
                    variant="outline"
                    @click="console.log(workout)"
                >
                    <Terminal class="size-4" />
                    console.log
                </Button>
            </div>
        </div>

        <div class="min-h-[30vh]" />

        <div
            v-if="showTimer"
            class="fixed
                bottom-0
                left-1/2
                inline-flex
                -translate-x-1/2
                items-center
                gap-2
                rounded
                border-x
                border-t
                px-2
                py-1
                font-mono
                backdrop-blur-md"
        >
            Break:
            {{ breakTime }}
            <Button
                size="sm"
                variant="ghost"
                @click="showTimer = false"
            >
                <X class="size-4" />
            </Button>
        </div>
    </div>

    <AssignTemplateDialog
        v-if="assignTemplateDialogVisible"
        hide-none
        @assign="assign"
    />

    <AddMovementDialog
        v-if="addMovementDialogVisible"
        @add="addMovement"
    />
    <EditMovementDialog
        v-if="editMovementDialogVisible"
        @edit="editMovement"
    />
    <EditMovementNotesDialog
        v-if="editMovementNotesDialogVisible"
        @edit="editMovementNotes"
    />
    <DeleteMovementDialog
        v-if="deleteMovementDialogVisible"
        @delete="removeMovement"
    />

    <EditPerformanceNotesDialog
        v-if="editPerformanceNotesDialogVisible"
        @edit="editPerformanceNotes"
    />

    <ReallyLeaveDialog
        v-if="reallyLeaveDialogVisible"
        @answer="leaveRoute"
    />
</template>

<script setup lang="ts">
import { useNow, watchDeep, } from '@vueuse/core'
import { Loader2, NotepadTextDashed, Plus, Save, Terminal, X, } from 'lucide-vue-next'

import EditMovementNotesDialog from '@/components/dialog/EditMovementNotesDialog.vue'
import EditPerformanceNotesDialog from '@/components/dialog/EditPerformanceNotesDialog.vue'
import { useToast, } from '@/components/ui/toast'
import EditMovement from '@/components/workout/EditMovement.vue'
import { insertWorkout, updateWorkout, } from '~/lib/api/workout'
import { type GyrnalWorkout, GyrnalWorkoutSchema, } from '~/lib/entities/gyrnal_workout'
import { MovementSchema, } from '~/lib/entities/movement'
import { PerformanceSchema, } from '~/lib/entities/performance'
import { type Workout, WorkoutSchema, } from '~/lib/entities/workout'

const emit = defineEmits<{
    (e: 'update:modelValue', payload: Workout): void
}>()
const props = defineProps<{
    modelValue: Workout,
    gyrnalWorkout?: GyrnalWorkout
}>()
const { modelValue, gyrnalWorkout, } = toRefs(props)

const router = useRouter()
const user = useSupabaseUser()
const { toast, } = useToast()
const now = useNow()

const allowLeave = ref(false)
const dragging = ref(false)
const hasChanges = ref(false)
const lastPerformance = ref(new Date())
const loading = ref(false)
const showTimer = ref(false)

const templateStore = useTemplateStore()
const { templates, } = storeToRefs(templateStore)

const dialogStore = useDialogStore()
const addMovementDialogVisible = dialogStore.isVisibleComputed('add-movement')
const assignTemplateDialogVisible = dialogStore.isVisibleComputed('assign-template')
const editMovementDialogVisible = dialogStore.isVisibleComputed('edit-movement')
const editMovementNotesDialogVisible = dialogStore.isVisibleComputed('edit-movement-notes')
const deleteMovementDialogVisible = dialogStore.isVisibleComputed('delete-movement')
const editPerformanceNotesDialogVisible = dialogStore.isVisibleComputed('edit-performance-notes')
const reallyLeaveDialogVisible = dialogStore.isVisibleComputed('really-leave')

const workout = computed({
    get () {
        return modelValue.value ?? WorkoutSchema.parse({})
    },
    set (newValue: Workout) {
        emit('update:modelValue', newValue)
    },
})

watchDeep(workout, () => {
    hasChanges.value = true
})

const workoutType = computed({
    get () {
        return workout.value?.metadata?.workoutType ?? ''
    },
    set (newValue: string) {
        if (!newValue) {
            if (workout.value.metadata.workoutType) {
                delete workout.value.metadata.workoutType
            }
        } else {
            workout.value.metadata.workoutType = newValue
        }

    },
})

const breakTime = computed(() => {
    const ms = now.value.getTime() - lastPerformance.value.getTime()
    const seconds = Math.floor((ms / 1000) % 60)
    const minutes = Math.floor(ms / (1000 * 60))
    return `${minutes.toString()}:${seconds.toString().padStart(2, '0')}`
})

const addMovement = (name: string) => {
    workout.value.movements.push(MovementSchema.parse({ name: name.trim(), }))
}
const tryRemoveMovement = ({ index, }: {index: number}) => {
    if (workout.value.movements[index].performances && workout.value.movements[index].performances.length > 0) {
        dialogStore.showDialog('delete-movement', index)
    } else {
        removeMovement(index)
    }
}
const removeMovement = (index: number) => {
    workout.value.movements.splice(index, 1)
}
const editMovement = ({ index, name, }: {index: number, name: string}) => {
    workout.value.movements[index].name = name.trim()
}
const editMovementNotes = ({ notes, index, }:{notes: string, index: number, }) => {
    workout.value.movements[index].notes = notes.trim()
}

const addPerformance = ({ index, }: {index: number}) => {
    workout.value.movements[index].performances.push(PerformanceSchema.parse({}))
    showTimer.value = true
    lastPerformance.value = new Date()
}
const removePerformance = ({ index, pindex, }: {index: number, pindex: number}) => {
    workout.value.movements[index].performances.splice(pindex, 1)
}
const editPerformanceNotes = ({ notes, index, pindex, }:{notes: string, index: number, pindex: number}) => {
    workout.value.movements[index].performances[pindex].notes = notes.trim()
}

const save = async () => {
    loading.value = true
    try {
        if (gyrnalWorkout.value && gyrnalWorkout.value.id) {
            gyrnalWorkout.value.data = workout.value
            allowLeave.value = true
            await updateWorkout(gyrnalWorkout.value)
        } else {
            workout.value.finishedAt = new Date()
            const uploadData = GyrnalWorkoutSchema.parse({
                userid: user.value?.id,
                data: workout.value,
            })
            allowLeave.value = true
            await insertWorkout(uploadData)
        }
    } catch(e) {
        console.error(e)
        toast({
            title: 'Error saving workout',
            description: e.toString(),
            variant: 'destructive',
        })
    } finally {
        loading.value = false
    }
}

const assign = (templateId: string | null) => {
    if (templateId) {
        const template = templates.value.find((template) => template.id == templateId)
        if (template) {
            template.movements.forEach((mvmnt) => {
                addMovement(mvmnt)
            })

            if (!workout.value.metadata) {
                workout.value.metadata = {}
            }
            workout.value.metadata.template = templateId
        }
    }
}

const leaveRoute = ({ answer, path, }: {answer: boolean, path: string }) => {
    allowLeave.value = answer
    if (allowLeave.value) {
        router.push(path)
    }
}

const handleBeforeUnload = (e) => {
    console.log(e)
    e.preventDefault()
    e.returnValue = "Are you sure you want to close the tab?"
}

onMounted(() => {
    templateStore.init()
    window.addEventListener('beforeunload', handleBeforeUnload)
})

onUnmounted(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload)
})

onBeforeRouteLeave((e) => {
    if (!allowLeave.value && hasChanges.value) {
        dialogStore.showDialog('really-leave', e.fullPath)
        return false
    }

    allowLeave.value = false
    return true
})
</script>
