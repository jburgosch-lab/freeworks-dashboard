# Etapa 1: compilar Angular
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Etapa 2: servidor nginx
FROM nginx:alpine

COPY --from=build /app/dist/freeworks-dashboard/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]