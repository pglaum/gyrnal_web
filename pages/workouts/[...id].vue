<template>
    <div
        v-if="workout"
        class="container my-24 grid max-w-3xl gap-8"
    >
        <div class="flex items-center justify-between border-b pb-2">
            <H2 class="pt-2">
                {{ formatDate(workout.data.startedAt, 'd. MMMM, HH:MM') }}
                -
                {{ formatDate(workout.data.finishedAt, 'HH:MM') }}
            </H2>

            <Button as-child>
                <NuxtLink
                    to="/workouts/new"
                    class="flex items-center gap-2"
                >
                    <Pencil class="size-4" />
                    Edit workout
                </NuxtLink>
            </Button>
        </div>

        <Blockquote v-if="workout.data.notes">
            {{ workout.data.notes }}
        </Blockquote>

        <Card
            v-for="movement, index in workout.data.movements"
            :key="index"
        >
            <CardHeader>
                <CardTitle>
                    {{ movement.name }}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div class="grid gap-4">
                    <div
                        v-for="performance, pindex in movement.performances"
                        :key="pindex"
                        class="flex items-center gap-4"
                    >
                        <Large>
                            {{ performance.load.weight }}
                            {{ performance.load.unit }}
                        </Large>
                        <div>
                            {{ performance.reps }} reps
                        </div>
                        <div v-if="performance.fails">
                            {{ performance.fails }} fails
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { formatDate, } from '@vueuse/core'
import { Pencil, } from 'lucide-vue-next'

import { getWorkout, } from '~/lib/api/workout'

const route = useRoute()
const workout = ref()

onMounted(async () => {
    workout.value = await getWorkout(route.params.id)
})
</script>
