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
        </template>

        <DeleteWorkoutDialog
            v-if="deleteWorkoutDialogVisible"
            @delete="removeWorkout"
        />
    </div>
</template>

<script setup lang="ts">
import { formatDate, } from '@vueuse/core'
import { Pencil, Trash2, } from 'lucide-vue-next'

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
