<template>
    <div class="container my-24 grid max-w-3xl gap-8">
        <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-2">
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
            <div>
                <Button
                    as-child
                    variant="link"
                >
                    <NuxtLink
                        to="/templates"
                        class="inline-flex items-center gap-2"
                    >
                        Templates
                        <ArrowRight class="size-4" />
                    </NuxtLink>
                </Button>
            </div>
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
import { ArrowRight, Plus, } from 'lucide-vue-next'

import { getWorkouts, } from '~/lib/api/workout'

const workouts = ref()

onMounted(async () => {
    workouts.value = await getWorkouts()
})
</script>
