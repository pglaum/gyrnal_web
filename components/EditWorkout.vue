<template>
    <div class="grid gap-4">
        <H2>
            New Workout
        </H2>

        <div
            v-if="workout"
            class="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
            <TextInput
                v-model="workoutType"
                label="Workout type"
                description="Push, pull, legs, ..."
                class="md:col-span-2"
            />
            <TextInput
                v-model="workout.startedAt"
                type="datetime-local"
                label="Started at"
                description="Was probably set automatically..."
            />
            <TextInput
                v-model="workout.finishedAt"
                type="datetime-local"
                label="Finished at"
                description="Will be automatically updated on create."
            />
            <TextAreaInput
                v-model="workout.notes"
                label="Notes"
                class="md:col-span-2"
            />
        </div>

        <div
            v-if="workout"
            class="grid grid-cols-1 gap-4"
        >
            <H3>Movements</H3>

            <div>
                <Button>
                    <Plus class="size-4" />
                    Add Movement
                </Button>
            </div>
        </div>

        <pre>{{ modelValue }}</pre>
    </div>
</template>

<script setup lang="ts">
import { Plus, } from 'lucide-vue-next'

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

const workoutType = ref('')
watch(workoutType, () => {
    if (!workoutType.value) {
        if (workout.value.metadata.workoutType) {
            delete workout.value.metadata.workoutType
        }
    } else {
        workout.value.metadata.workoutType = workoutType.value
    }
})
</script>
