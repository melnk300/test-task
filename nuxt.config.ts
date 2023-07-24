
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'slide', mode: 'out-in' }
  },
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  imports: {
    dirs: ['store']
  },
  ssr: false,
})
