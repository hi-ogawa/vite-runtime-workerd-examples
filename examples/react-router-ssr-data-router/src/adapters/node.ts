import type { ViteDevServer } from "vite";
import { requestHandler } from "../entry.server";
import { createMiddleware } from "@hattip/adapter-node";

declare module "@hattip/adapter-node" {
  interface DecoratedRequest {
    // injected by @hiogawa/vite-plugin-ssr-middleware
    viteDevServer: ViteDevServer;
  }
}

export default createMiddleware(async (ctx) => {
  return requestHandler({
    request: ctx.request,
    async getHtmlTemplate() {
      if (import.meta.env.DEV) {
        const html = (await import("/index.html?raw")).default;
        return await ctx.platform.request.viteDevServer.transformIndexHtml(
          ctx.request.url,
          html,
        );
      } else {
        // embed prebuilt index.html
        return (await import("/dist/client/index.html?raw")).default;
      }
    },
  });
});
