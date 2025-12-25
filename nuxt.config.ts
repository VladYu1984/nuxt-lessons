// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    app: {
        head: {
            title: 'Lessons Nuxt 4 Application',
            meta: [
                { name: 'description', content: 'Nuxt + Nest microservices' },
            ],
        },
    },
    devServer: {
        port: Number(process.env.NUXT_PORT) || 3002,
    },
    runtimeConfig: {
        public: {
            apiBaseUrl: 'http://localhost:3000',
        },
    },
    modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/image', '@pinia/nuxt'],
    css: ['~/assets/scss/main.scss'],
    fonts: {
        google: {
            families: {
                Montserrat: [400, 500, 700],
                Inter: [400, 500, 600],
            },
        },
    },
});
