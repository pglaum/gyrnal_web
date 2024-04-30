<template>
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink as-child>
                    <NuxtLink to="/">
                        <Home class="size-4" />
                    </NuxtLink>
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <template
                v-for="breadcrumb, index in breadcrumbs"
                :key="index"
            >
                <BreadcrumbItem>
                    <BreadcrumbLink
                        v-if="breadcrumb.length > 1"
                        as-child
                    >
                        <NuxtLink :to="breadcrumb[1]">
                            {{ breadcrumb[0] }}
                        </NuxtLink>
                    </BreadcrumbLink>
                    <BreadcrumbPage v-else>
                        {{ breadcrumb[0] }}
                    </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator v-if="index < breadcrumbs.length - 1" />
            </template>
        </BreadcrumbList>
    </Breadcrumb>
</template>

<script setup lang="ts">
import { Home, } from 'lucide-vue-next'

defineProps<{
    breadcrumbs: Array<Array<string>>
}>()
</script>
