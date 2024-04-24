<template>
    <GDialog>
        <template #title>
            Delete Workout
        </template>
        <template #body>
            Do you really want to delete this workout?
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
    (e: 'delete', payload: null): void
}>()

const dialogStore = useDialogStore()

const remove = () => {
    emit('delete', null)
    dialogStore.closeDialog()
}
</script>
