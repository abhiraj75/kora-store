#!/usr/bin/env bash
# Prepares a fresh Daytona sandbox: installs Node if missing, optionally Chromium for screenshots.
# Usage: bash scripts/bootstrap-sandbox.sh                  (Node only)
#        WITH_BROWSER=1 bash scripts/bootstrap-sandbox.sh   (Node + Chromium)
set -euo pipefail
NODE_VERSION=22.12.0
DIR="/opt/node-v${NODE_VERSION}-linux-x64"

if ! command -v node >/dev/null 2>&1; then
  url="https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz"
  if command -v curl >/dev/null 2>&1; then
    curl -fsSL "$url" -o /tmp/node.tgz
  else
    python3 -c "import sys, urllib.request; urllib.request.urlretrieve(sys.argv[1], '/tmp/node.tgz')" "$url"
  fi
  tar -xzf /tmp/node.tgz -C /opt
  for b in node npm npx; do ln -sf "${DIR}/bin/${b}" "/usr/local/bin/${b}"; done
fi
echo "node $(node -v), npm $(npm -v)"

if [ "${WITH_BROWSER:-0}" = "1" ]; then
  npm i --no-save playwright@1.56.0 >/dev/null
  npx playwright install --with-deps chromium
fi
