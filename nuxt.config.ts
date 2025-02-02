// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  ui: {
    icons: ['heroicons']
  },
  plugins: ['~/plugins/detect-chromium.js']
})
