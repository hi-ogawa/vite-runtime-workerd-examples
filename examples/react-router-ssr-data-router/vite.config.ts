import { defineConfig, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import { vitePluginViteNodeMiniflare } from "@hiogawa/vite-node-miniflare";
import fs from "node:fs";

let viteDevServer: ViteDevServer;

export default defineConfig({
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
  plugins: [
    react(),
    {
      // grab ViteDevServer for `getHtmlTemplate` rpc below
      name: "getViteDevServer",
      configureServer(server) {
        viteDevServer = server;
      },
    },
    vitePluginViteNodeMiniflare({
      debug: true,
      // SSR HMR is currently not supported by vite react plugin yet
      hmr: false,
      entry: "/src/adapters/workerd.ts",
      customRpc: {
        getHtmlTemplate: async (url: string) => {
          const html = await fs.promises.readFile("./index.html", "utf-8");
          return viteDevServer.transformIndexHtml(url, html);
        },
      },
    }),
  ],
});
