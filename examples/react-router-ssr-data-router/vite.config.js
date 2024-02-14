import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vitePluginSsrMiddleware } from "@hiogawa/vite-plugin-ssr-middleware"

export default defineConfig({
  clearScreen: false,
  plugins: [
    react(),
    vitePluginSsrMiddleware({
      entry: "/src/adapters/node.ts"
    }),
  ],
});
