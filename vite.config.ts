import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        orientation: "portrait",

        start_url: "/",
        name: "Super mega simon",
        short_name: "sSimon",
        description: "Le super simon t'sais",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            purpose: "any",
            sizes: "512x512",
            src: "icon512.png",
            type: "image/png"
          },
          {
            purpose: "any",
            sizes: "192x192",
            src: "icon192.png",
            type: "image/png"
          }
        ]
      }
    })
  ]
});
