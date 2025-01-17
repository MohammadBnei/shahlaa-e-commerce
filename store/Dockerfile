FROM node:20-alpine AS base
WORKDIR /usr/src/app

FROM base AS dependencies
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --frozen-lockfile --production

FROM base AS builder
WORKDIR /usr/src/app

# Copy all files and install dev dependencies
COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
RUN yarn install --frozen-lockfile
RUN yarn build:server

FROM base AS release
WORKDIR /usr/src/app

# Copy only production dependencies and built files
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.medusa/server ./server

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Start the application
CMD ["yarn", "start"]
