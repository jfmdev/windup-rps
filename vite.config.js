import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "./",
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true
      },
      includeAssets: [
        "assets/*.jpg",
        "assets/*.png"
      ],
      manifest: {
        name: "Windup RPS",
        description: "A game where you must play rock-paper-scissors against a group of evil (but no so smart) windup robots",
        orientation: "landscape",
        theme_color: "#0000ff",
        icons: [
          {
            src: "misc/favicon.png",
            sizes: "32x32"
          },
          {
            src: "misc/favicon-48.png",
            type: "image/png",
            sizes: "48x48"
          },
          {
            src: "misc/favicon-96.png",
            type: "image/png",
            sizes: "96x96"
          },
          {
            src: "misc/favicon-192.png",
            type: "image/png",
            sizes: "192x192"
          },
        ],
        screenshots: [
          {
            src: "misc/screenshot-1.jpg",
            type: "image/jpg",
            sizes: "1200x900",
            form_factor: "wide"
          },
          {
            src: "misc/screenshot-2.jpg",
            type: "image/jpg",
            sizes: "1200x900",
            form_factor: "wide"
          },
          {
            src: "misc/screenshot-3.jpg",
            type: "image/jpg",
            sizes: "1200x900",
            form_factor: "wide"
          },
          {
            src: "misc/screenshot-4.jpg",
            type: "image/jpg",
            sizes: "1200x900",
            form_factor: "wide"
          }
        ]
      }
    })
  ]
});
