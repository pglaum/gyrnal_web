<template>
    <GDialog>
        <template #title>
            Delete Movement
        </template>
        <template #body>
            Do you really want to delete this movement?
        </template>
        <template #footer>
            <Button
                variant="outline"
                @click="dialogStore.closeDialog()"
            >
                Cancel
            </Button>
            <Button
                variant="destructive"
                @click="remove()"
            >
                Delete
            </Button>
        </template>
    </GDialog>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    (e: 'delete', payload: number): void
}>()

const dialogStore = useDialogStore()
const { dialogData, } = storeToRefs(dialogStore)

const remove = () => {
    emit('delete', dialogData.value)
    dialogStore.closeDialog()
}
</script>
