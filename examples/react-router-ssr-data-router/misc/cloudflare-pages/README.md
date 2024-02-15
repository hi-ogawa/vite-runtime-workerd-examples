# cloudflare-pages

script for cloudflare pages deployment

```sh
# initial setup
npx wrangler pages project create vite-runtime-workerd-react-router-hiro18181 --production-branch main

# build for cloudflare pages advanced mode
pnpm build

# local preview with wranger cli
pnpm preview

# deploy
pnpm release
```

## references

mostly copied from https://github.com/hi-ogawa/demo-remix-unstable-vite-cloudflare-workers/tree/2bd6bced8f866e39555e0d0d41518ec3d48d2735/misc/cloudflare-pages
