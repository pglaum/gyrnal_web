<template>
    <GDialog auto-focus>
        <template #title>
            Movement notes
        </template>
        <template #body>
            <form @submit.prevent="edit()">
                <TextAreaInput
                    v-model="getDialogData.notes"
                    label="Notes"
                />
            </form>
        </template>
        <template #footer>
            <Button
                variant="outline"
                @click="dialogStore.closeDialog()"
            >
                Cancel
            </Button>
            <Button
                @click="edit()"
            >
                Ok
            </Button>
        </template>
    </GDialog>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    (e: 'edit', payload: {notes: string, index: number, }): void
}>()

const dialogStore = useDialogStore()
const { dialogData, } = storeToRefs(dialogStore)

const edit = () => {
    emit('edit', dialogData.value ?? { notes: '', index: -1, })
    dialogStore.closeDialog()
}

const getDialogData = computed(() => dialogData.value ?? { notes: '', index: -1, })
</script>
