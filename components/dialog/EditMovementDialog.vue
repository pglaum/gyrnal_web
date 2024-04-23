<template>
    <GDialog auto-focus>
        <template #title>
            Edit movement
        </template>
        <template #body>
            <form @submit.prevent="edit()">
                <TextInput
                    v-model="getDialogData.name"
                    label="Movement name"
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
    (e: 'edit', payload: {name: string, index: number}): void
}>()

const dialogStore = useDialogStore()
const { dialogData, } = storeToRefs(dialogStore)

const edit = () => {
    emit('edit', dialogData.value ?? { name: 'name', index: -1, })
    dialogStore.closeDialog()
}

const getDialogData = computed(() => dialogData.value ?? { name: 'name', index: -1, })
</script>
