<template>
    <div class="container my-24 grid max-w-3xl gap-8">
        <Title>Workout {{ title }}</Title>
        <Breadcrumbs
            :breadcrumbs="[
                [ `Workout on ${title}`]
            ]"
        />
        <template v-if="workout">
            <div class="border-b pb-2">
                <H2 class="pt-2">
                    {{ title }}
                </H2>
            </div>

            <div class="flex flex-wrap gap-2">
                <Button
                    as-child
                    variant="outline"
                >
                    <NuxtLink
                        :to="`/workouts/edit/${route.params.id}`"
                        class="flex items-center gap-2"
                    >
                        <Pencil class="size-4" />
                        Edit
                    </NuxtLink>
                </Button>
                <Button
                    v-if="!workout.data.metadata.template"
                    variant="outline"
                    @click="dialogStore.showDialog('create-template', workout)"
                >
                    <Plus class="size-4" />
                    Create template
                </Button>
                <Button
                    variant="outline"
                    @click="dialogStore.showDialog('assign-template', workout)"
                >
                    <NotepadTextDashed class="size-4" />
                    Assign template
                </Button>
                <Button
                    variant="destructive-outline"
                    @click="dialogStore.showDialog('delete-workout')"
                >
                    <Trash2 class="size-4" />
                    Delete
                </Button>
            </div>

            <div
                v-if="workout.data.metadata"
                class="flex gap-2"
            >
                <Badge
                    v-if="workout.data.metadata.workoutType"
                    class="py-1"
                >
                    <Dumbbell class="size-4" />
                    {{ workout.data.metadata.workoutType }}
                </Badge>
                <Badge
                    v-if="workout.data.metadata.template"
                    class="py-1"
                >
                    <NotepadTextDashed class="size-4" />
                    {{ theTemplate?.title }}
                </Badge>
            </div>

            <div v-if="workout.data.notes">
                <Blockquote>
                    {{ workout.data.notes }}
                </Blockquote>
            </div>

            <div class="grid gap-4">
                <ShowMovement
                    v-for="movement, index in workout.data.movements"
                    :key="index"
                    :movement="movement"
                />
            </div>
        </template>

        <CreateTemplateDialog v-if="createTemplateDialogVisible" />
        <AssignTemplateDialog
            v-if="assignTemplateDialogVisible"
            @assign="assign"
        />
        <DeleteWorkoutDialog
            v-if="deleteWorkoutDialogVisible"
            @delete="removeWorkout"
        />
    </div>
</template>

<script setup lang="ts">
import { formatDate, } from '@vueuse/core'
import { Dumbbell, NotepadTextDashed, Pencil, Plus, Trash2, } from 'lucide-vue-next'

import { Badge, } from '~/components/ui/badge'
import { deleteWorkout, getWorkout, updateWorkout, } from '~/lib/api/workout'
import { useTemplateStore, } from '~/stores/templateStore'

const route = useRoute()
const workout = ref()

const templateStore = useTemplateStore()
const { templates, } = storeToRefs(templateStore)

const dialogStore = useDialogStore()
const assignTemplateDialogVisible = dialogStore.isVisibleComputed('assign-template')
const createTemplateDialogVisible = dialogStore.isVisibleComputed('create-template')
const deleteWorkoutDialogVisible = dialogStore.isVisibleComputed('delete-workout')

onMounted(async () => {
    templateStore.init()
    workout.value = await getWorkout(route.params.id)
})

const removeWorkout = () => {
    deleteWorkout(route.params.id)
}

const theTemplate = computed(() => templates.value.find((template) => template.id == workout.value.data.metadata.template))
const title = computed(() => {
    if (!workout.value?.data?.startedAt) {
        return ''
    }
    return `${formatDate(workout.value?.data?.startedAt, 'D. MMMM, HH:mm')} - ${formatDate(workout.value?.data?.finishedAt, 'HH:mm')}`
})

const assign = (template: string|null) => {
    if (!workout.value.data.metadata) {
        workout.value.data.metadata = {}
    }
    if (template){
        workout.value.data.metadata['template'] = template
    } else {
        delete workout.value.data.metadata.template
    }
    updateWorkout(workout.value)
}
</script>
