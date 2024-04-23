import { clone, } from "~/lib/utils"

export const useDialogStore = defineStore('dialog', {
    state () {
        return {
            dialogData: null,
            dialogIdentifier: '',
            close: false,
        }
    },
    getters: {
        isVisibleComputed: (state) => (identifier: string) => computed(() => (state.dialogIdentifier === identifier)),
        isVisible: (state) => (identifier: string) => state.dialogIdentifier === identifier,
    },
    actions: {
        showDialog (identifier: string, item: any = null, cb: Function | null = null) {
            this.dialogData = clone(item)
            this.dialogIdentifier = identifier
            this.close = false
            if (cb) {
                cb(this.dialogData)
            }
        },
        closeDialog () {
            if (this.close === true) {
                this.close = false
            }
            this.close = true
        },
    },
})
