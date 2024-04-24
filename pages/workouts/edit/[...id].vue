<template>
    <div class="container my-24 grid max-w-3xl gap-8">
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

import { deleteWorkout, getWorkout, } from '~/lib/api/workout'

const route = useRoute()
const workout = ref()

const dialogStore = useDialogStore()
const deleteWorkoutDialogVisible = dialogStore.isVisibleComputed('delete-workout')

onMounted(async () => {
    workout.value = await getWorkout(route.params.id)
})

const removeWorkout = () => {
    deleteWorkout(route.params.id)
}
</script>
