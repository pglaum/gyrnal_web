<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
useSeoMeta({
    title: 'Gyrnal',
    ogTitle: 'Gyrnal',
    description: 'Empower your workouts, chronicle your success!',
    ogDescription: 'Empower your workouts, chronicle your success!',
    ogImage: '/gyrnal_logo.png',
    twitterCard: 'summary_large_image',
})
</script>

<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.2s;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(.1rem);
}
</style>
