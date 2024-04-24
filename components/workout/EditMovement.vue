<template>
    <Card>
        <CardHeader>
            <CardTitle class="flex flex-wrap justify-between">
                <div class="flex items-center gap-2">
                    <Large>{{ movement.name }}</Large>
                    <Button
                        variant="ghost"
                        size="icon"
                        @click="dialogStore.showDialog('edit-movement', {index, name: movement.name})"
                    >
                        <Pencil class="size-4" />
                    </Button>
                </div>
                <div class="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        @click="dialogStore.showDialog('edit-movement-notes', {notes: movement.notes, index})"
                    >
                        <Quote class="size-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        @click="emit('tryRemove', {index})"
                    >
                        <Trash2 class="size-4" />
                    </Button>
                </div>
            </CardTitle>
            <CardDescription v-if="movement.notes">
                <Blockquote class="whitespace-pre-wrap">
                    {{ movement.notes }}
                </Blockquote>
            </CardDescription>
        </CardHeader>

        <CardContent class="grid gap-4">
            <div
                v-if="movement.performances && movement.performances.length > 0"
                class="grid gap-4"
            >
                <EditPerformance
                    v-for="performance, pindex in movement.performances"
                    :key="pindex"
                    :performance="performance"
                    :index="index"
                    :pindex="pindex"
                    @remove="emit('removePerformance', {index, pindex})"
                />
            </div>

            <div>
                <Button
                    variant="outline"
                    size="sm"
                    @click="emit('addPerformance', {index})"
                >
                    <Plus class="size-4" />
                    Add performance
                </Button>
            </div>
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
import { Pencil, Plus, Quote, Trash2, } from 'lucide-vue-next'

import type { Movement, } from '~/lib/entities/movement'

const emit = defineEmits<{
    (e: 'tryRemove', payload: {index: number}): void
    (e: 'addPerformance', payload: {index: number}): void
    (e: 'removePerformance', payload: {index: number, pindex: number}): void
}>()
defineProps<{
    movement: Movement
    index: number
}>()

const dialogStore = useDialogStore()
</script>
