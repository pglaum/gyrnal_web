<template>
    <div class="grid gap-4">
        <div class="flex justify-between border-b">
            <H2>
                New Workout
            </H2>
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

            <div class="grid gap-4">
                <Card
                    v-for="movement, index in workout.movements"
                    :key="index"
                >
                    <CardHeader>
                        <CardTitle class="flex flex-wrap justify-between">
                            <Large>{{ movement.name }}</Large>
                            <div class="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    @click="dialogStore.showDialog('edit-movement', {index, name: movement.name}, editMovement)"
                                >
                                    <Pencil class="size-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    @click="tryRemoveMovement(index)"
                                >
                                    <Trash2 class="size-4" />
                                </Button>
                            </div>
                        </CardTitle>
                    </CardHeader>

                    <CardContent class="grid gap-4">
                        <div
                            v-if="movement.performances && movement.performances.length > 0"
                            class="grid gap-4"
                        >
                            <div
                                v-for="performance, pindex in movement.performances"
                                :key="pindex"
                                class="flex items-end gap-2"
                            >
                                <TextInput
                                    v-model="performance.load.weight"
                                    type="number"
                                    label="Weight"
                                    select-on-focus
                                />
                                <TextInput
                                    v-model="performance.load.unit"
                                    type="string"
                                    label="Unit"
                                    select-on-focus
                                />
                                <TextInput
                                    v-model="performance.reps"
                                    type="number"
                                    label="Reps"
                                    select-on-focus
                                />
                                <TextInput
                                    v-model="performance.fails"
                                    type="number"
                                    label="Fails"
                                    select-on-focus
                                />
                                <Button
                                    variant="outline"
                                    size="icon"
                                    class="shrink-0"
                                    @click="removePerformance(index, pindex)"
                                >
                                    <Trash2 class="size-4" />
                                </Button>
                            </div>
                        </div>

                        <div>
                            <Button
                                variant="outline"
                                size="sm"
                                @click="addPerformance(index)"
                            >
                                <Plus class="size-4" />
                                Add performance
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div>
                <Button @click="dialogStore.showDialog('add-movement')">
                    <Plus class="size-4" />
                    Add Movement
                </Button>
            </div>
        </div>

        <pre>{{ modelValue }}</pre>
    </div>

    <AddMovementDialog
        v-if="addMovementDialogVisible"
        @add="addMovement"
    />
    <EditMovementDialog
        v-if="editMovementDialogVisible"
        @edit="editMovement"
    />
    <DeleteMovementDialog
        v-if="deleteMovementDialogVisible"
        @delete="removeMovement"
    />

    <ReallyLeaveDialog
        v-if="reallyLeaveDialogVisible"
        @answer="leaveRoute"
    />
</template>

<script setup lang="ts">
import { Loader2,
         Pencil, Plus, Save, Trash2, } from 'lucide-vue-next'

import { useToast, } from '@/components/ui/toast'
import { insertWorkout, } from '~/lib/api/workout'
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

const allowLeave = ref(false)
const loading = ref(false)

const dialogStore = useDialogStore()
const addMovementDialogVisible = dialogStore.isVisibleComputed('add-movement')
const editMovementDialogVisible = dialogStore.isVisibleComputed('edit-movement')
const deleteMovementDialogVisible = dialogStore.isVisibleComputed('delete-movement')
const reallyLeaveDialogVisible = dialogStore.isVisibleComputed('really-leave')

const workout = computed({
    get () {
        return modelValue.value ?? WorkoutSchema.parse({})
    },
    set (newValue: Workout) {
        emit('update:modelValue', newValue)
    },
})

const workoutType = ref('')
watch(workoutType, () => {
    if (!workoutType.value) {
        if (workout.value.metadata.workoutType) {
            delete workout.value.metadata.workoutType
        }
    } else {
        workout.value.metadata.workoutType = workoutType.value
    }
})

const addMovement = (name: string) => {
    workout.value.movements.push(MovementSchema.parse({ name, }))
}
const tryRemoveMovement = (index: number) => {
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
    workout.value.movements[index].name = name
}

const addPerformance = (index: number) => {
    workout.value.movements[index].performances.push(PerformanceSchema.parse({}))
}
const removePerformance = (index: number, pindex: number) => {
    workout.value.movements[index].performances.splice(pindex, 1)
}

const save = async () => {
    loading.value = false
    try {
        if (gyrnalWorkout.value && gyrnalWorkout.value.id) {
        // update
        } else {
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
        loading.value = true
    }
}

const leaveRoute = ({ answer, path, }: {answer: boolean, path: string }) => {
    allowLeave.value = answer
    if (allowLeave.value) {
        router.push(path)
    }
}

onBeforeRouteLeave((e) => {
    console.log(e)
    if (!allowLeave.value) {
        dialogStore.showDialog('really-leave', e.fullPath)
        return false
    }

    allowLeave.value = false
    return true
})
</script>
