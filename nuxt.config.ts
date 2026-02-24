// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/eslint", "nuxt-gtag", "nuxt-auth-utils", "@pinia/nuxt"],
  vite: {
    // @ts-expect-error vite type mismatch between @nuxt/schema and @tailwindcss/vite https://github.com/tailwindlabs/tailwindcss/discussions/19655 TODO remove later
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
    },
    experimental: {
      websocket: true
    }
  },
  gtag: {
    initMode: "manual",
    id: "G-NQXTE21RG7"
  },
  app: {
    head: {
      script: [
        {
          src: "https://kit.fontawesome.com/49aa64a243.js",
          crossorigin: "anonymous"
        }
      ],
      meta: [
        {
          property: "og:title",
          content: "Stratège - Jeu de Plateau en Ligne"
        },
        {
          property: "og:description",
          content:
            "Jouez à Stratège en ligne ! Utilisez vos stratégies pour éliminer les pions adverses et remporter la victoire."
        },
        {
          property: "og:url",
          content: "https://stratege.rd-tech.fr"
        },
        {
          property: "og:type",
          content: "website"
        },
        {
          property: "og:site_name",
          content: "Stratège"
        }
      ]
    }
  }
});
