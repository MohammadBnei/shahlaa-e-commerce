FROM node:22-slim AS base
WORKDIR /usr/src/app
RUN npm install -g bun

FROM base AS install

WORKDIR /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN bun install --frozen-lockfile

FROM base AS prerelease
COPY --from=install /temp/prod/ ./ 
COPY . .
ENV NODE_ENV=production
RUN bun run build

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/ .
COPY medusa-config.ts ./
ENV NODE_ENV=production
ENV PORT=3000
CMD ["bun", "start"]