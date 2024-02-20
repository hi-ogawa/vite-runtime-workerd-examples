import { requestHandler } from "../entry.server";

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    return requestHandler({
      request,
      async getHtmlTemplate() {
        if (import.meta.env.DEV) {
          const html = (await import("/index.html?raw")).default;
          return env.__RPC.transformIndexHtml(request.url, html);
        } else {
          // embed prebuilt index.html
          return (await import("/dist/client/index.html?raw")).default;
        }
      },
    });
  },
};
