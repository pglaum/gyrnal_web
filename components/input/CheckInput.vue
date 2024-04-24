<template>
    <div class="flex items-center gap-x-2">
        <Switch
            v-if="asSwitch"
            :id="id"
            v-model:checked="inputValue"
            :name="name"
        />
        <Checkbox
            v-else
            :id="id"
            v-model:checked="inputValue"
            :name="name"
        />
        <div class="grid w-full gap-1.5">
            <Label
                v-if="label || $slots.default"
                :for="id"
                :class="{'text-destructive': errorMsg}"
            >
                <slot>
                    {{ label }}
                    <span
                        v-if="required"
                        class="font-medium text-destructive"
                    >*</span>
                </slot>
            </Label>
            <slot name="description">
                <InputDescription v-if="description">
                    {{ description }}
                </InputDescription>
            </slot>
            <slot name="error">
                <InputError v-if="errorMsg">
                    {{ errorMsg }}
                </InputError>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import InputDescription from '@/components/ui/input/InputDescription.vue'
import InputError from '@/components/ui/input/InputError.vue'

const id = useId()

const emit = defineEmits<{
    (e: 'update:modelValue', payload: boolean): void
    (e: 'blur', payload: Event): void
}>()
const props = defineProps<{
    modelValue?: boolean,
    label?: string,
    errorMsg?: string,
    name?: string,
    description?: string,
    asSwitch?: boolean,
    required?: boolean,
}>()
const { modelValue, } = toRefs(props)

const inputValue = computed({
    get () {
        return modelValue.value ?? false
    },
    set (newValue: boolean) {
        emit('update:modelValue', newValue)
    },
})
</script>
