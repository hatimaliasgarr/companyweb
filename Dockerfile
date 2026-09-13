# syntax=docker/dockerfile:1
# Zerobugg production image: builds with Vinext, serves via `node server.mjs`
# (vinext/server/prod-server). The Cloudflare Workers target remains unchanged;
# this image is for any Docker-based host.

ARG NODE_VERSION=22

# ---------- Build stage ----------
FROM node:${NODE_VERSION}-bookworm-slim AS build
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

# Install all dependencies first so source changes reuse the cached layer.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Runtime stage ----------
FROM node:${NODE_VERSION}-bookworm-slim AS runtime
WORKDIR /app

# server.mjs reads PORT and HOST; 0.0.0.0 is required to accept container traffic.
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOST=0.0.0.0

# Production dependencies only. @vitejs/plugin-rsc lives in "dependencies"
# because vinext's production SSR entry imports it at runtime.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY server.mjs ./
COPY --from=build /app/dist ./dist

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]

CMD ["node", "server.mjs"]
