<template>
    <div class="container my-24 grid max-w-3xl gap-8">
        <div>
            <Button as-child>
                <NuxtLink
                    to="/workouts/new"
                    class="flex items-center gap-2"
                >
                    <Plus class="size-4" />
                    New workout
                </NuxtLink>
            </Button>
        </div>

        <div class="grid gap-4">
            <WorkoutListItem
                v-for="workout, index in workouts"
                :key="index"
                :workout="workout"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Plus, } from 'lucide-vue-next'

import { getWorkouts, } from '~/lib/api/workout'

const workouts = ref()

onMounted(async () => {
    workouts.value = await getWorkouts()
})
</script>
