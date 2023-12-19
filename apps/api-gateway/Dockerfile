FROM node:alpine AS development

WORKDIR /usr/src
RUN mkdir app proto

COPY package*.json ./app
COPY ./prisma ./app/prisma
COPY ./libs ./app/libs
COPY ./apps/api-gateway/src/proto ./proto

RUN cd app
RUN yarn
COPY . ./app
RUN yarn build api-gateway

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src
RUN mkdir app proto

COPY package*.json ./app
COPY ./prisma ./app/prisma
COPY ./libs ./app/libs
COPY ./apps/api-gateway/src/proto ./proto

RUN cd app
RUN yarn --only=production

COPY . ./app

COPY --from=development /usr/src/app/dist ./app/dist

# CMD ["node", "dist/apps/api-gateway/main"]
