FROM node:latest as node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=node /app/dist/front /usr/share/nginx/html
