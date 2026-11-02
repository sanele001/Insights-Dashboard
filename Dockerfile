FROM node:22-alpine AS base

WORKDIR /app

FROM base AS deps
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./

RUN npm ci

# Build the optimized Next.js app and its standalone production server.
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules

COPY . .
# Compile the application for production.
RUN npm run build

FROM base AS runner
# Configure the production server to listen on all interfaces at port 3000.
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Create an unprivileged user for running the application.
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Document the port used by the Next.js server.
EXPOSE 3000

# Start the standalone Next.js production server.
CMD ["node", "server.js"]
