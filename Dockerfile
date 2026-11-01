# ============================================
# Stage 0: Base image
# ============================================

# IMPORTANT: Node.js Version Maintenance
# Keep this in sync with the node-version used in .github/workflows/ci.yml.
ARG NODE_VERSION=22-alpine

FROM node:${NODE_VERSION} AS base
RUN corepack enable

# ============================================
# Stage 1: Install dependencies
# ============================================

FROM base AS installer
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile

# ============================================
# Stage 2: Build
# ============================================

FROM base AS builder
WORKDIR /app
COPY --from=installer /app/ .

# Only needed to satisfy prisma.config.ts during `prisma generate` — every page is
# force-dynamic now, so nothing actually queries this during the build.
ARG DATABASE_URL="postgresql://build:build@localhost:5432/build"
ENV DATABASE_URL=${DATABASE_URL}

RUN pnpm db:generate
RUN pnpm run build

# ============================================
# Stage 3: Run Next.js application
# ============================================

FROM node:${NODE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static .next/static

USER node

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
EXPOSE 3000

CMD ["node", "server.js"]