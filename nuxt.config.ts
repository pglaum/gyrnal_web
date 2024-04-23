// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        pageTransition: {
            name: 'page',
            mode: 'out-in',
        },
        components: [
            '~/components',
            '~/components/input',
        ],
    },
    modules: [
        '@nuxtjs/supabase',
        '@nuxtjs/tailwindcss',
        'shadcn-nuxt',
    ],
    shadcn: {
        prefix: '',
        componentDir: './components/ui',
    },
    supabase: {
        redirectOptions: {
            login: '/login',
            callback: '/login',
            exclude: [
                '/login',
                '/register',
                '/forgot-password',
                '/reset-password',
            ],
        },
    },
})
