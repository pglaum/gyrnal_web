<template>
    <div class="flex items-center justify-between border-b">
        <H2 class="pt-2">
            {{ template && template.id ? 'Edit Template' : 'New Template' }}
        </H2>
        <div class="flex flex-wrap gap-2">
            <Button
                variant="default"
                :disabled="loading"
                @click="save"
            >
                <Loader2
                    v-if="loading"
                    class="size-4 animate-spin"
                />
                <Save
                    v-else
                    class="size-4"
                />
                Save
            </Button>
        </div>
    </div>

    <div class="grid gap-4">
        <TextInput
            v-model="template.title"
            label="Title"
        />

        <TextInput
            v-model="template.workoutType"
            label="Workout type"
        />

        <H4>Movements</H4>
        <draggable
            :animation="200"
            :component-data="{
                type: 'transition-group',
                name: !dragging ? 'flip-list' : null,
            }"
            group="movements"
            ghost-class="bg-muted"
            handle=".handle"
            tag="transition-group"
            :list="template.movements"
            @start="dragging = true"
            @end="dragging = false"
        >
            <div
                v-for="_, index in template.movements"
                :key="index"
                class="flex items-end gap-2 py-2"
            >
                <div
                    class="handle cursor-move rounded p-2 hover:bg-muted"
                    title="Drag & drop movements"
                >
                    <GripVertical class="size-4" />
                </div>
                <TextInput
                    v-model="template.movements[index]"
                    :label="`Movement ${index+1}`"
                />
                <Button
                    variant="destructive-outline"
                    size="icon"
                    class="shrink-0"
                    @click="template.movements.splice(index, 1)"
                >
                    <Trash2 class="size-4" />
                </Button>
            </div>
        </draggable>
        <Button
            variant="outline"
            @click="template.movements.push('')"
        >
            <Plus class="size-4" />
            Add movement
        </Button>
    </div>
</template>

<script setup lang="ts">
import { GripVertical, Loader2, Plus, Save, Trash2, } from 'lucide-vue-next'

import { useToast, } from '~/components/ui/toast'
import { insertTemplate, updateTemplate, } from '~/lib/api/template'
import type { Template, } from '~/lib/entities/template'

const props = defineProps<{
    template: Template
}>()
const { template, } = toRefs(props)

const user = useSupabaseUser()
const { toast, } = useToast()
const templateStore = useTemplateStore()

const dragging = ref(false)
const loading = ref(false)

const save = async () => {
    loading.value = true
    try {
        if (template.value && template.value.id) {
            await updateTemplate(template.value)
        } else {
            template.value.userid = user.value.id
            await insertTemplate(template.value)
        }
        templateStore.refresh()
    } catch(e) {
        console.error(e)
        toast({
            title: 'Error saving workout',
            description: e.toString(),
            variant: 'destructive',
        })
    } finally {
        loading.value = false
    }
}
</script>
