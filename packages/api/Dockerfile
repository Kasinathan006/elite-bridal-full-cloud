FROM node:20-slim AS base
ENV DIR=/app
WORKDIR $DIR

FROM base AS builder
COPY package.json package-lock.json turbo.json ./
COPY packages/db ./packages/db
COPY packages/api ./packages/api
RUN npm install
RUN npx turbo build --filter=@bridal-connect/api

FROM base AS runner
COPY --from=builder /app/packages/api/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/db ./packages/db

EXPOSE 3001
CMD ["node", "dist/index.js"]
