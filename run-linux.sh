#!/usr/bin/env bash
# Запуск Desktop girl на Linux: при первом запуске ставит зависимости.
cd "$(dirname "$0")" || exit 1
if [ ! -d node_modules ]; then
  npm install || exit 1
  [ -f node_modules/electron/path.txt ] || node node_modules/electron/install.js
fi
exec npx electron . --no-sandbox --ozone-platform=x11 "$@"
