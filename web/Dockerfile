FROM node:18 as build

WORKDIR /web

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /web/build /usr/share/nginx/html