<template>
    <Card>
        <CardHeader>
            <CardTitle class="flex gap-4">
                <Large>
                    {{ movement.name }}
                </Large>
                <Badge
                    v-if="movement.superset"
                    class="text-xs"
                    variant="secondary"
                >
                    <Sparkles class="size-4" />
                    Superset
                </Badge>
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
                    <div
                        v-if="performance.load.bodyweight"
                        class="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1"
                    >
                        <PersonStanding class="size-5" />
                        <Plus
                            v-if="performance.load.weight && performance.load.weight > 0"
                            class="size-4"
                        />
                        <Minus
                            v-if="performance.load.weight && performance.load.weight < 0"
                            class="size-4"
                        />
                        <div
                            v-if="performance.load.weight"
                            class="font-semibold"
                        >
                            {{ Math.abs(performance.load.weight) }}
                            {{ performance.load.unit }}
                        </div>
                    </div>
                    <div
                        v-else
                        class="inline-flex items-center gap-2 rounded-md bg-muted px-2 py-1"
                    >
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
import { Minus, PersonStanding, Plus, Sparkles, Weight, } from 'lucide-vue-next'

import type { Movement, } from '~/lib/entities/movement'

defineProps<{
    movement: Movement
}>()
</script>
