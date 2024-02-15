Based on https://github.com/remix-run/react-router/tree/9aed7d0959bfc8c63ef4539dd4030072be8446d3/examples/ssr-data-router

```sh
# run on Workerd using @hiogawa/vite-node-miniflare
pnpm dev

# run on NodeJS using @hiogawa/vite-plugin-ssr-middleware
pnpm dev-node

# build for cloudflare pages advanced mode
# (see also misc/cloudflare-pages/README.md)
pnpm build

# local preview with wrangler cli
pnpm preview

# deploy
pnpm release
```
