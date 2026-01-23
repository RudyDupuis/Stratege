// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/eslint", "nuxt-gtag", "nuxt-auth-utils"],
  vite: {
    plugins: [tailwindcss()]
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false
    }
  ],
  imports: {
    dirs: ["utils/**", "../utils/**"]
  },
  nitro: {
    imports: {
      dirs: ["utils/**", "server/utils/**"]
    }
  },
  app: {
    head: {
      script: [
        {
          src: "https://kit.fontawesome.com/49aa64a243.js",
          crossorigin: "anonymous"
        }
      ]
    }
  }
});
