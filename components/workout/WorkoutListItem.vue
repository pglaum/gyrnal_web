<template>
    <NuxtLink :to="`/workouts/${workout.id}`">
        <Card class="transition-shadow hover:shadow-md">
            <CardHeader>
                <CardTitle>
                    {{ formatDate(workout.data.startedAt, 'd. MMMM, HH:mm') }}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div class="grid gap-4">
                    <div class="flex items-end justify-end gap-2">
                        <Button as-child>
                            <NuxtLink
                                :to="`/workouts/${workout.id}`"
                                class="inline-flex items-center gap-2"
                            >
                                Show workout
                                <ArrowRight class="size-4" />
                            </NuxtLink>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    </NuxtLink>
</template>

<script setup lang="ts">
import { formatDate, } from '@vueuse/core'
import { ArrowRight, } from 'lucide-vue-next'

import { type GyrnalWorkout, } from '~/lib/entities/gyrnal_workout'

defineProps<{
    workout: GyrnalWorkout
}>()
</script>
