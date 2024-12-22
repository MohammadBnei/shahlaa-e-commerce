FROM node:22-slim AS base
WORKDIR /usr/src/app

RUN npm install -g bun

FROM node:22 AS install

WORKDIR /temp/prod

RUN npm i -g bun
COPY package.json bun.lockb /temp/prod/
RUN bun install --frozen-lockfile

FROM base AS prerelease
COPY --from=install /temp/prod/ ./ 
COPY . .
ENV NODE_ENV=production
RUN bun run build:server

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/dist .
COPY --from=prerelease /usr/src/app/package.json .
COPY medusa-config.js ./
ENV NODE_ENV=production
ENV PORT=3000
CMD ["bun", "start"]