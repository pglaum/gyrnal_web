<template>
    <Card>
        <CardHeader>
            <CardTitle>
                <Large>
                    {{ movement.name }}
                </Large>
            </CardTitle>
            <CardDescription v-if="movement.notes">
                <Blockquote class="whitespace-pre-wrap">
                    {{ movement.notes }}
                </Blockquote>
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div class="grid gap-4">
                <div
                    v-for="performance, pindex in movement.performances"
                    :key="pindex"
                    class="flex flex-wrap items-center gap-x-4 gap-y-2"
                >
                    <div class="inline-flex items-center gap-2 rounded-md bg-muted px-2 py-1">
                        <Weight class="size-5" />
                        <div class="font-semibold">
                            {{ performance.load.weight }}
                            {{ performance.load.unit }}
                        </div>
                    </div>
                    <div>
                        {{ performance.reps }} reps
                    </div>
                    <div v-if="performance.fails">
                        {{ performance.fails }} fails
                    </div>
                    <div v-if="performance.notes">
                        <Blockquote>{{ performance.notes }}</Blockquote>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
import { Weight, } from 'lucide-vue-next'

import type { Movement, } from '~/lib/entities/movement'

defineProps<{
    movement: Movement
}>()
</script>
