<template>
    <div class="grid gap-4">
        <H2>
            New Workout
        </H2>

        <div
            v-if="workout"
            class="grid gap-4"
        >
            <TextInput
                v-model="workout.startedAt"
                type="datetime-local"
                label="Started at"
            />
            <TextInput
                v-model="workout.finishedAt"
                type="datetime-local"
                label="Finished at"
                description="Will be automatically updated on create."
            />
        </div>

        <pre>{{ modelValue }}</pre>
    </div>
</template>

<script setup lang="ts">
import { type Workout, WorkoutSchema, } from '~/lib/entities/workout'

const emit = defineEmits<{
    (e: 'update:modelValue', payload: Workout): void
}>()
const props = defineProps<{
    modelValue: Workout,
}>()
const { modelValue, } = toRefs(props)

const workout = computed({
    get () {
        return modelValue.value ?? WorkoutSchema.parse({})
    },
    set (newValue: Workout) {
        emit('update:modelValue', newValue)
    },
})
</script>
