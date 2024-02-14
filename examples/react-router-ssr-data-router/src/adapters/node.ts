import fs from "node:fs";
import type { ViteDevServer } from "vite";
import { render } from "../entry.server";
import { createMiddleware } from "@hattip/adapter-node";

declare module "@hattip/adapter-node" {
  interface DecoratedRequest {
    viteDevServer: ViteDevServer;
  }
}

export default createMiddleware(async (ctx) => {
  const result = await render(ctx.request)

  // redirect response
  if (result instanceof Response) {
    return result;
  }

  // ssr
  let html: string;
  if (import.meta.env.DEV) {
    html = await fs.promises.readFile("./index.html", "utf-8");
    html = await ctx.platform.request.viteDevServer.transformIndexHtml("/", html);
  } else {
    html = await fs.promises.readFile("./dist/client/index.html", "utf-8");
  }
  html = html.replace("<!--app-html-->", result);
  return new Response(html, { headers: { "content-type": "text/html" }});
});
