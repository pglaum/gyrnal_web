<template>
    <Dialog
        v-model:open="open"
    >
        <DialogContent
            class="max-h-[90dvh] w-full grid-rows-[auto_minmax(0,1fr)_auto] p-0"
            :class="[
                large ? 'max-w-3xl' : 'max-w-xl',
            ]"
        >
            <DialogHeader class="p-6 pb-0">
                <DialogTitle class="flex items-center justify-between">
                    <h1 class="text-2xl">
                        <slot name="title" />
                    </h1>

                    <Button
                        variant="ghost"
                        size="icon"
                        @click="open = false"
                    >
                        <X class="size-6" />
                        <span class="sr-only">Close</span>
                    </Button>
                </DialogTitle>

                <DialogDescription>
                    <slot name="description" />
                </DialogDescription>
            </DialogHeader>

            <div
                ref="dialog"
                class="grid gap-4 overflow-y-auto px-6 py-4"
            >
                <slot name="body">
                    Hallo
                </slot>
            </div>

            <DialogFooter class="flex flex-wrap gap-4 p-6 pt-0">
                <slot name="footer">
                    <Button
                        type="button"
                        @click="emit('cancel', null); hideDialog()"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        @click="emit('confirm', null)"
                    >
                        Ok
                    </Button>
                </slot>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { X, } from 'lucide-vue-next'

const emit = defineEmits<{
    (e: 'cancel', payload: null): void,
    (e: 'confirm', payload: null): void,
}>()
defineProps<{
    large?: string,
    autoFocus?: boolean
}>()

const dialog = ref<HTMLElement>()
const open = ref(true)
const dialogStore = useDialogStore()
const { close, } = storeToRefs(dialogStore)

const hideDialog = () => {
    open.value = false

    setTimeout(() => {
        dialogStore.$reset()
    }, 200)
}

watch(open, (value) => {
    if (!value) {
        hideDialog()
    }
})

watch(close, (value) => {
    if (value) {
        hideDialog()
    }
})

onMounted(() => {
    open.value = true

    setTimeout(() => {
        let input = dialog.value?.querySelector('input:first-of-type')
        if (input == null) {
            input = dialog.value?.querySelector('textarea:first-of-type')
        }
        if (input != null) {
            input.focus()
        }
    }, 300)
})

onBeforeUnmount(() => {
    hideDialog()
})
</script>
