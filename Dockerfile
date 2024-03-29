#
# ---- Build ----
FROM node:18.4.0-alpine3.16 as build

# Workdir in build stage should be equal with release stage, razzle uses this path
WORKDIR /app

# install and cache node packages
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
RUN rm -rf src node_modules

#
# ---- Release ----
FROM nginx:1.23.0

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
