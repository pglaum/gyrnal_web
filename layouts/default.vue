<template>
    <div class="flex min-h-screen flex-col">
        <div class="container sticky top-0 z-10 flex justify-between py-4 backdrop-blur-md">
            <NuxtLink
                to="/"
                class="inline-flex
                    items-center
                    gap-2
                    font-mono
                    font-medium
                    uppercase
                    text-muted-foreground"
            >
                <img
                    class="size-6 rounded"
                    src="/gyrnal_logo.png"
                >
                Gyrnal
            </NuxtLink>
            <div class="flex gap-4">
                <button
                    v-if="user"
                    class="underline"
                    @click="signOut"
                >
                    Sign out
                </button>
            </div>
        </div>
        <slot />
        <Toaster />

        <div class="container mt-auto py-4 text-center">
            &copy; {{ new Date().getFullYear() }}
            <NuxtLink
                href="https://pglaum.de"
                class="underline underline-offset-4 hover:no-underline"
            >
                Philipp Glaum
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">

import { toast, } from '~/components/ui/toast'

const router = useRouter()
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const signOut = async () => {
    const { error, } = await supabase.auth.signOut()
    if (error) {
        console.error('Error signing out', error.message)
        toast({
            title: 'Error signing out',
            description: error.message,
            variant: 'destructive',
        })
    } else {
        toast({
            title: 'Signed out',
            variant: 'success',
        })
        router.push('/login')
    }
}
</script>
