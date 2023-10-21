FROM node:18 as build

WORKDIR /tools/CAT

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /tools/CAT/dist /usr/share/nginx/html