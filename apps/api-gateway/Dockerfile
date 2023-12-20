FROM node:alpine AS development

WORKDIR /usr/src/proto
COPY ./apps/api-gateway/src/proto .

WORKDIR /usr/src/app
COPY ./package*.json .
COPY ./prisma ./prisma
COPY ./libs ./libs

RUN yarn
COPY . .
RUN yarn build api-gateway

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/proto
COPY ./apps/api-gateway/src/proto .

WORKDIR /usr/src/app
COPY ./package*.json .
COPY ./prisma ./prisma
COPY ./libs ./libs

RUN yarn --only=production

COPY . .
COPY --from=development /usr/src/app/dist ./app/dist

# CMD ["node", "dist/apps/api-gateway/main"]