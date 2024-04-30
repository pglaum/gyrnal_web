import { getTemplates, } from "~/lib/api/template"
import type { Template, } from "~/lib/entities/template"

export const useTemplateStore = defineStore('template', {
    state () {
        return {
            isLoading: false,
            templates: [] as Template[],
        }
    },
    getters: {
    },
    actions: {
        async init () {
            if (!this.templates || this.templates.length == 0) {
                await this.refresh()
            }
        },
        async refresh () {
            if (this.isLoading) {
                return
            }
            this.isLoading = true
            const templates = await getTemplates()
            this.templates = templates
            this.isLoading = false
        },
    },
})
