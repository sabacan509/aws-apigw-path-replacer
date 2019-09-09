#!/bin/ash
set -ue

npm run build && \
npm run express:run