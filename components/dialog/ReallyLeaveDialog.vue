<template>
    <GDialog>
        <template #title>
            Leave this page?
        </template>
        <template #body>
            Do you really want to leave this page with unsaved changes?
        </template>
        <template #footer>
            <Button
                variant="outline"
                @click="allow(false)"
            >
                Cancel
            </Button>
            <Button
                variant="destructive"
                @click="allow(true)"
            >
                Leave page
            </Button>
        </template>
    </GDialog>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    (e: 'answer', payload: {answer: boolean, path: string}): void
}>()

const dialogStore = useDialogStore()
const { dialogData, } = storeToRefs(dialogStore)

const allow = (answer: boolean) => {
    emit('answer', { answer, path: dialogData.value ?? '', })
    dialogStore.closeDialog()
}
</script>

