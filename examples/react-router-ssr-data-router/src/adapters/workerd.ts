import { render } from "../entry.server";

// TOOD: refactor common things with adapters/node.ts

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const result = await render(request);

    // redirect response
    if (result instanceof Response) {
      return result;
    }

    // ssr
    let html: string;
    if (import.meta.env.DEV) {
      html = await env.__VITE_NODE_MINIFLARE_CLIENT.rpc.getIndexHtml(
        request.url,
      );
    } else {
      // TODO: replace during build
      html = env.INDEX_HTML;
    }
    html = html.replace("<!--app-html-->", result);
    return new Response(html, { headers: { "content-type": "text/html" } });
  },
};
