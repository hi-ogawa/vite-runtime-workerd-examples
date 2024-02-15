import * as React from "react";
import ReactDOMServer from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server";
import { routes } from "./app";

export async function requestHandler({
  request,
  getHtmlTemplate,
}: {
  request: Request;
  getHtmlTemplate: () => Promise<string>;
}) {
  const { query, dataRoutes } = createStaticHandler(routes);
  const context = await query(request);

  // redirect, error, etc...
  if (context instanceof Response) {
    return context;
  }

  // ssr
  const router = createStaticRouter(dataRoutes, context);
  const ssrHtml = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouterProvider
        router={router}
        context={context}
        nonce="the-nonce"
      />
    </React.StrictMode>,
  );
  let html = await getHtmlTemplate();
  html = html.replace("<!--app-html-->", ssrHtml);
  return new Response(html, { headers: { "content-type": "text/html" } });
}
