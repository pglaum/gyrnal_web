FROM node:20.9-alpine as build-stage

ARG SUPABASE_URL
ARG SUPABASE_KEY
ARG SUPABASE_SERVICE_KEY

RUN apk add --no-cache git

RUN mkdir /nuxt
WORKDIR /nuxt

RUN echo "SUPABASE_URL=${SUPABASE_URL}" > .env \
	echo "SUPABASE_KEY=${SUPABASE_KEY}" >> .env

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
RUN yarn generate


FROM nginx:alpine as production-stage
COPY .docker/nginx.conf /etc/nginx.conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-stage /nuxt/.output/public /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
