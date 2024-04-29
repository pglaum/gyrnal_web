<template>
    <div class="grid gap-2">
        <div class="flex flex-wrap items-end gap-2 md:flex-nowrap">
            <Button
                :variant="perf.load.bodyweight ? 'default' : 'outline'"
                size="icon"
                class="shrink-0"
                @click="perf.load.bodyweight = !perf.load.bodyweight"
            >
                <PersonStanding class="size-4" />
            </Button>
            <TextInput
                v-model="perf.load.weight"
                type="number"
                label="Weight"
                class="max-w-20 md:max-w-full"
                select-on-focus
            />
            <TextInput
                v-model="perf.load.unit"
                type="string"
                label="Unit"
                class="max-w-20 md:max-w-full"
                select-on-focus
            />
            <TextInput
                v-model="perf.reps"
                type="number"
                label="Reps"
                class="max-w-20 md:max-w-full"
                select-on-focus
            />
            <TextInput
                v-model="perf.fails"
                type="number"
                label="Fails"
                class="max-w-20 md:max-w-full"
                select-on-focus
            />
            <Button
                variant="outline"
                size="icon"
                class="shrink-0"
                @click="dialogStore.showDialog('edit-performance-notes', {notes: performance.notes, index, pindex})"
            >
                <Quote class="size-4" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                class="shrink-0"
                @click="emit('remove', null)"
            >
                <Trash2 class="size-4" />
            </Button>
        </div>
        <div v-if="perf.notes">
            <Blockquote class="whitespace-pre-wrap">
                {{ perf.notes }}
            </Blockquote>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PersonStanding, Quote, Trash2, } from 'lucide-vue-next'

import { type Performance, PerformanceSchema,
} from '~/lib/entities/performance'

const emit = defineEmits<{
    (e: 'remove', payload: null): void
    (e: 'update:modelValue', payload: Performance): void
}>()
const props = defineProps<{
    performance: Performance
    index: number
    pindex: number
}>()
const { performance, } = toRefs(props)

const dialogStore = useDialogStore()

const perf = computed({
    get (){
        return performance.value ?? PerformanceSchema.parse({})
    },
    set (newValue: Performance){
        emit('update:modelValue', newValue)
    },
})
</script>
