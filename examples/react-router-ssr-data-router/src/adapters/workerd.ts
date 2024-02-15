import { requestHandler } from "../entry.server";

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    return requestHandler({
      request,
      getHtmlTemplate() {
        if (import.meta.env.DEV) {
          return env.__VITE_NODE_MINIFLARE_CLIENT.rpc.getHtmlTemplate(
            request.url,
          );
        } else {
          throw new Error("todo: embed template during build");
        }
      },
    });
  },
};
