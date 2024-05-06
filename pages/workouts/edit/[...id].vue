<template>
    <div class="container my-24 grid max-w-3xl gap-8">
        <Title>Edit workout {{ title }}</Title>
        <Breadcrumbs
            :breadcrumbs="[
                [`Workout on ${title}`, `/workouts/${workout?.id}`],
                ['Edit']
            ]"
        />
        <template v-if="workout">
            <EditWorkout
                v-model="workout.data"
                :gyrnal-workout="workout"
            />
        </template>

        <DeleteWorkoutDialog
            v-if="deleteWorkoutDialogVisible"
            @delete="removeWorkout"
        />
    </div>
</template>

<script setup lang="ts">
import { formatDate, } from '@vueuse/core'

import { deleteWorkout, getWorkout, } from '~/lib/api/workout'

const route = useRoute()
const workout = ref()

const dialogStore = useDialogStore()
const deleteWorkoutDialogVisible = dialogStore.isVisibleComputed('delete-workout')

const title = computed(() => {
    if (!workout.value?.data?.startedAt) {
        return ''
    }
    return `${formatDate(workout.value?.data?.startedAt, 'D. MMMM, HH:mm')} - ${formatDate(workout.value?.data?.finishedAt, 'HH:mm')}`
})

onMounted(async () => {
    workout.value = await getWorkout(route.params.id)
})

const removeWorkout = () => {
    deleteWorkout(route.params.id)
}
</script>
