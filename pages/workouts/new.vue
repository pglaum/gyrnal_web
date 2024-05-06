<template>
    <div class="container my-24 max-w-3xl">
        <Breadcrumbs
            :breadcrumbs="[
                ['New workout']
            ]"
        />
        <EditWorkout v-model="workout" />
    </div>
</template>

<script setup lang="ts">
import { WorkoutSchema, } from '~/lib/entities/workout'

const workout = ref()

onMounted(() => {
    workout.value = WorkoutSchema.parse({ startedAt: new Date(), finishedAt: new Date(), })
})

useHead({
    title: 'New workout',
})
</script>
