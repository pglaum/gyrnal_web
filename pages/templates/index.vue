<template>
    <div class="container my-24 grid max-w-3xl gap-8">
        <Breadcrumbs
            :breadcrumbs="[
                ['Templates']
            ]"
        />
        <H2>Templates</H2>
        <div>
            <Button as-child>
                <NuxtLink
                    to="/templates/new"
                    class="inline-flex gap-2"
                >
                    <Plus class="size-4" />
                    New template
                </NuxtLink>
            </Button>
        </div>
        <div class="grid gap-4">
            <TemplateListItem
                v-for="template, index in templates"
                :key="index"
                :template="template"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Plus, } from 'lucide-vue-next'

const templateStore = useTemplateStore()
const { templates, }= storeToRefs(templateStore)

onMounted(async () => {
    templateStore.init()
})

useHead({
    title: 'Templates',
})
</script>

