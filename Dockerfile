FROM node:22-slim AS builder

WORKDIR /app

RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

COPY . .

RUN npm ci && npm run db:generate && npm run build



FROM node:22-slim AS app-runner

WORKDIR /app

COPY --from=builder /app/.output ./.output

RUN addgroup --system app && adduser --system --ingroup app app

USER app

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]



FROM node:22-slim AS migrate-runner

WORKDIR /app

COPY --from=builder /app ./

CMD ["npm", "run", "db:migrate"]