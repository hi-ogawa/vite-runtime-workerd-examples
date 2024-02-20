import { defineConfig, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import { vitePluginViteNodeMiniflare } from "@hiogawa/vite-node-miniflare";
import { Log } from "miniflare";

export default defineConfig((env) => ({
  clearScreen: false,
  ssr: {
    // need to manually specify cjs deps to pre-bundle into esm
    optimizeDeps: {
      include: [
        "react",
        "react/jsx-dev-runtime",
        "react-dom",
        "react-dom/server",
      ],
    },
  },
  build: env.isSsrBuild
    ? {
        outDir: "dist/server",
        rollupOptions: {
          input: "src/adapters/workerd.ts",
        },
      }
    : {
        outDir: "dist/client",
      },
  plugins: [
    react(),
    vitePluginViteNodeMiniflare({
      debug: true,
      // SSR HMR is currently not supported by vite react plugin yet
      hmr: false,
      entry: "/src/adapters/workerd.ts",
      miniflareOptions(options) {
        options.log = new Log();
        // you can extend MiniflareOptions to setup KV etc...
        // options.kvPersist
      },
    }),
  ],
}));
