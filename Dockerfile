FROM node:22-alpine as build-stage

ARG SUPABASE_URL
ARG SUPABASE_KEY

RUN apk add --no-cache git

RUN mkdir /nuxt
WORKDIR /nuxt

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

RUN echo "SUPABASE_URL=${SUPABASE_URL}" > .env
RUN echo "SUPABASE_KEY=${SUPABASE_KEY}" >> .env
RUN source .env

ENTRYPOINT [ "yarn", "dev" ]
