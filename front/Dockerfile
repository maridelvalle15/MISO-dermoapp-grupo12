
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod


FROM nginx:1.17.1-alpine
COPY --from=node /app/dist/front /usr/share/nginx/html
