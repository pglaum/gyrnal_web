<template>
    <Card>
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

<script setup lang="ts">
import type { Movement, } from '~/lib/entities/movement'

defineProps<{
    movement: Movement
}>()
</script>
