<template>
    <div class="container my-24 grid max-w-3xl gap-8">
        <template v-if="workout">
            <div class="flex flex-wrap items-center justify-between border-b pb-2">
                <H2 class="pt-2">
                    {{ formatDate(workout.data.startedAt, 'd. MMMM, HH:mm') }}
                    -
                    {{ formatDate(workout.data.finishedAt, 'HH:mm') }}
                </H2>

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
                        variant="destructive-outline"
                        @click="dialogStore.showDialog('delete-workout')"
                    >
                        <Trash2 class="size-4" />
                        Delete
                    </Button>
                </div>
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
            </div>

            <div v-if="workout.data.notes">
                <Blockquote>
                    {{ workout.data.notes }}
                </Blockquote>
            </div>

            <ShowMovement
                v-for="movement, index in workout.data.movements"
                :key="index"
                :movement="movement"
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
import { Dumbbell, Pencil, Trash2, } from 'lucide-vue-next'

import { Badge, } from '~/components/ui/badge'
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
