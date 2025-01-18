// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  routeRules: {
    "/": { prerender: true },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },
  app: {
    head: {
      title: "Immerhe.im",
      meta: [
        {
          "http-equiv": "x-ua-compatible",
          content: "IE=edge",
        },
        {
          name: "apple-mobile-web-app-title",
          content: "Immerhe.im",
        },
        {
          name: "apple-mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "application-name",
          content: "Immerhe.im",
        },
        {
          name: "msapplication-TileColor",
          content: "#b1f6d6",
        },
        {
          name: "msapplication-TileImage",
          content: "/ms-icon-150x150.png",
        },
      ],
      link: [
        {
          rel: "shortcut icon",
          href: "/favicon.ico",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "512x512",
          href: "/android-chrome-512x512.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/android-chrome-192x192.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "96x96",
          href: "/android-chrome-96x96.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          href: "/android-chrome-192x192.png",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
        {
          rel: "mask-icon",
          href: "/safari-pinned-tab.svg",
          color: "#c2410c",
        },
      ],
      script: [
        {
          src: "https://tr.n4o.xyz/js/025ec81T16b52R2918614L76c3885N5e34995459.js",
          defer: true,
          async: true,
          "data-domain": "immerhe.im",
          "data-api": "https://tr.n4o.xyz/magic/18c5dcddMc036A4d1dGb785Iaa2e310238c9",
        },
      ],
    },
  },
});

