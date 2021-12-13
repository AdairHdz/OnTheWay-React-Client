# FROM node:14.17.1-buster AS build

# WORKDIR /app

# COPY package.json package.json
# COPY package-lock.json package-lock.json

# RUN npm ci --production

# COPY . .

# RUN npm run build

# NGINX Web Server
FROM nginx:1.12-alpine AS prod

COPY build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]