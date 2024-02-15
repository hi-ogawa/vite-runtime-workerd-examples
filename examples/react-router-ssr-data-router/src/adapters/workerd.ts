import { requestHandler } from "../entry.server";

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    return requestHandler({
      request,
      async getHtmlTemplate() {
        if (import.meta.env.DEV) {
          // customRpc is exposed via `env.__VITE_NODE_MINIFLARE_CLIENT`
          return env.__VITE_NODE_MINIFLARE_CLIENT.rpc.getHtmlTemplate(
            request.url,
          );
        } else {
          // embed prebuilt index.html
          return (await import("/dist/client/index.html?raw")).default;
        }
      },
    });
  },
};
