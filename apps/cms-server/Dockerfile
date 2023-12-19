FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

# COPY ../../../proto/ /usr/src

CMD ["node", "dist/apps/api-gateway/main"]
