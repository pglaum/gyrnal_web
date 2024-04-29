<template>
    <GDialog auto-focus>
        <template #title>
            Assign a template
        </template>
        <template #body>
            <div class="divide-y rounded-lg border">
                <div
                    v-if="!hideNone"
                    class="cursor-pointer px-2 py-1 hover:bg-muted"
                    @click="assign(null)"
                >
                    None
                </div>
                <div
                    v-for="template, index in templates"
                    :key="index"
                    class="cursor-pointer px-2 py-1 hover:bg-muted"
                    @click="template.id && assign(template.id)"
                >
                    {{ template.title }}
                </div>
            </div>
        </template>
        <template #footer>
            <Button
                variant="outline"
                @click="dialogStore.closeDialog()"
            >
                Cancel
            </Button>
        </template>
    </GDialog>
</template>

<script setup lang="ts">
import { useTemplateStore, } from '~/stores/templateStore'

const emit = defineEmits<{
    (e: 'assign', payload: string | null): void
}>()

const props = defineProps<{
    hideNone?: boolean
}>()

const dialogStore = useDialogStore()
const templateStore = useTemplateStore()
const { templates, } = storeToRefs(templateStore)

const assign = (template: string | null) => {
    emit('assign', template)
    dialogStore.closeDialog()
}

onMounted(() => {
    templateStore.init()
})
</script>
