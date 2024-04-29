<template>
    <NuxtLink :to="`/workouts/${workout.id}`">
        <Card class="transition-shadow hover:shadow-md">
            <CardHeader>
                <CardTitle>
                    {{ formatDate(workout.data.startedAt, 'D. MMMM, HH:mm') }}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div class="grid gap-4">
                    <div
                        v-if="workout.data.metadata?.workoutType"
                        class="flex items-center justify-start gap-2"
                    >
                        <Badge
                            v-if="workout.data.metadata.workoutType"
                            class="py-1"
                        >
                            <Dumbbell class="size-4" />
                            {{ workout.data.metadata.workoutType }}
                        </Badge>
                    </div>

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
import { ArrowRight, Dumbbell, } from 'lucide-vue-next'

import { type GyrnalWorkout, } from '~/lib/entities/gyrnal_workout'

defineProps<{
    workout: GyrnalWorkout
}>()
</script>
