export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('isChromium', () => {
      if (process.server) return false
  
      const userAgent = navigator.userAgent
      return /Chrom(e|ium)/.test(userAgent) && !/Edg/.test(userAgent)
    })
  })