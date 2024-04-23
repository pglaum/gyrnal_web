<template>
    <GDialog auto-focus>
        <template #title>
            Add a movement
        </template>
        <template #body>
            <form @submit.prevent="add()">
                <TextInput
                    v-model="name"
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
                @click="add()"
            >
                Ok
            </Button>
        </template>
    </GDialog>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    (e: 'add', payload: string): void
}>()

const dialogStore = useDialogStore()
const name = ref('')

const add = () => {
    emit('add', name.value)
    dialogStore.closeDialog()
}
</script>
