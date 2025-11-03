// https://nuxt.com/docs/api/configuration/nuxt-config
import viteSvgLoader from "vite-svg-loader";

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["@/assets/css/style.scss"],
  vite: {
    plugins: [viteSvgLoader()],
  },
  app: {
    baseURL: "/Dashboard_VUE/",
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montserrat:ital@0;1&family=Oswald&family=PT+Sans:wght@400;700&family=Roboto:ital,wght@0,100..900;1,100..900&family=Sora:wght@100..800&display=swap",
        },
      ],
    },
  },
});
