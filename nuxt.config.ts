// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        pageTransition: {
            name: 'page',
            mode: 'out-in',
        },
    },
    build: {
        postcss: {
            plugins: [
                require('rfs'),
            ],
        },
    },
    components: [
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],
    experimental: {
        payloadExtraction: false,
    },
    modules: [
        '@nuxtjs/supabase',
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        'shadcn-nuxt',
    ],
    pinia: {
        storesDirs: [ './stores/**', ],
    },
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
