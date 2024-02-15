#!/bin/bash
set -eu -o pipefail

THIS_DIR="$(dirname "${BASH_SOURCE[0]}")"
CF_DIST="$THIS_DIR/dist"
VITE_DIST="$(dirname $(dirname $THIS_DIR))/dist"

# copy static
rm -rf "$CF_DIST"
mkdir -p "$CF_DIST"
cp -r "$VITE_DIST/client/." "$CF_DIST"
rm -rf "$CF_DIST/.vite" "$CF_DIST/index.html"
cp "$THIS_DIR/_headers" "$THIS_DIR/_routes.json" "$CF_DIST"

# functions (cf. advanced mode https://developers.cloudflare.com/pages/platform/functions/advanced-mode/)
npx esbuild "$VITE_DIST/server/workerd.js" \
  --outfile="$CF_DIST/_worker.js" \
  --metafile="$VITE_DIST/esbuild-metafile-cloudflare-pages.json" \
  --bundle --minify --format=esm --platform=browser
