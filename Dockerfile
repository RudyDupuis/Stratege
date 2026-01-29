FROM node:25-alpine AS builder

WORKDIR /app

COPY . .

RUN npm ci && npm run db:generate && npm run build



FROM node:25-alpine AS app-runner

WORKDIR /app

COPY --from=builder /app/.output ./.output

RUN addgroup -S app && adduser -S app -G app

USER app

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]



FROM node:25-alpine AS migrate-runner

WORKDIR /app

COPY --from=builder /app ./

CMD ["npm", "run", "db:migrate"]