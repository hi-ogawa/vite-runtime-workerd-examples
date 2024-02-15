import fs from "node:fs";
import type { ViteDevServer } from "vite";
import { requestHandler } from "../entry.server";
import { createMiddleware } from "@hattip/adapter-node";

declare module "@hattip/adapter-node" {
  interface DecoratedRequest {
    viteDevServer: ViteDevServer;
  }
}

export default createMiddleware(async (ctx) => {
  return requestHandler({
    request: ctx.request,
    async getHtmlTemplate() {
      if (import.meta.env.DEV) {
        const html = await fs.promises.readFile("./index.html", "utf-8");
        return await ctx.platform.request.viteDevServer.transformIndexHtml(
          ctx.request.url,
          html,
        );
      } else {
        throw new Error("todo: embed template during server build");
      }
    },
  });
});
