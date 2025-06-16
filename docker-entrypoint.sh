#!/bin/sh
set -e

npm run db:setup || true
npm run db:seed || true

exec node server/index.js 