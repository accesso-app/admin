#
# ---- Build ----
FROM node:16.3.0-alpine3.11 as build

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
FROM nginx:1.21.0

COPY --from=build /app/dist /usr/share/nginx/html