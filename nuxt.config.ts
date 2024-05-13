// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        pageTransition: {
            name: 'page',
            mode: 'out-in',
        },
        head: {
            link: [
                {
                    rel: 'icon',
                    type: 'image/png',
                    href: '/gyrnal_logo.png',
                },
            ],
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
        clientOptions: {
            db: {
                schema: process.env.NUXT_PUBLIC_SCHEMA ?? 'gyrnal',
            },
        },
        redirectOptions: {
            login: '/login',
            callback: '/confirm',
            exclude: [
                '/login',
                '/register',
                '/forgot-password',
                '/reset-password',
            ],
            cookieRedirect: true,
        },
    },
})
