<template>
    <div class="container my-24 grid max-w-3xl gap-8">
        <template v-if="template">
            <EditTemplate :template="template" />
        </template>
    </div>
</template>

<script setup lang="ts">
import { getTemplate, } from '~/lib/api/template'

const route = useRoute()

const template = ref()

onMounted(async () => {
    template.value = await getTemplate(route.params.id)
})
</script>
