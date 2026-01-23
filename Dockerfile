FROM node:24-alpine

WORKDIR /app

RUN apk update

COPY . .
RUN npm install
RUN npm run db:generate
RUN npm run build

CMD ["sh", "-c", "npm run db:migrate && node .output/server/index.mjs"]