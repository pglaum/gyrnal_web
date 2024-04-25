FROM node:20.2-alpine as build-stage

RUN apk add --no-cache git

RUN mkdir /nuxt
WORKDIR /nuxt

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
