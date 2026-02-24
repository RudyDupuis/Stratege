FROM node:22-slim AS builder

WORKDIR /app

RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

COPY . .
RUN npm --version
RUN npm ci || (cat /root/.npm/_logs/* && false)
RUN npm ci && npm run db:generate && npm run build


FROM node:22-slim AS app-runner

WORKDIR /app

RUN apt-get update && \
    apt-get install -y wget && \ 
    wget https://storage.googleapis.com/tensorflow/libtensorflow/libtensorflow-cpu-linux-x86_64-2.10.0.tar.gz && \
    tar -C /usr/local -xzf libtensorflow-cpu-linux-x86_64-2.10.0.tar.gz && \
    ldconfig && \
    rm libtensorflow-cpu-linux-x86_64-2.10.0.tar.gz && \
    rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/.output ./.output

RUN groupadd -r app && useradd -r -g app app

USER app

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]


FROM node:22-slim AS migrate-runner

WORKDIR /app

COPY --from=builder /app ./

CMD ["npm", "run", "db:migrate"]