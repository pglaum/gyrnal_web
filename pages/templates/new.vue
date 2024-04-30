<template>
    <div class="container my-24 grid max-w-3xl gap-8">
        <Breadcrumbs
            :breadcrumbs="[
                ['Templates', '/templates'],
                ['New template']
            ]"
        />
        <template v-if="template">
            <EditTemplate :template="template" />
        </template>
    </div>
</template>

<script setup lang="ts">
import { TemplateSchema, } from '~/lib/entities/template'

const template = ref()

onMounted(async () => {
    template.value = TemplateSchema.parse({})
})
</script>
