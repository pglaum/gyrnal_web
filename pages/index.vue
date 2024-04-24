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
            <NuxtLink
                v-for="workout, index in workouts"
                :key="index"
                :to="`/workouts/${workout.id}`"
            >
                <Card class="transition-shadow hover:shadow-md">
                    <CardHeader>
                        <CardTitle>
                            {{ formatDate(workout.data.startedAt, 'd. MMMM, HH:MM') }}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div class="grid gap-4">
                            <div class="flex items-end justify-end gap-2">
                                <Button
                                    :as="NuxtLink"
                                    :to="`/workouts/${workout.id}`"
                                >
                                    Show workout
                                    <ArrowRight class="size-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatDate, } from '@vueuse/core'
import { ArrowRight, Plus, } from 'lucide-vue-next'

import { getWorkouts, } from '~/lib/api/workout'

const workouts = ref()

onMounted(async () => {
    workouts.value = await getWorkouts()
})
</script>
