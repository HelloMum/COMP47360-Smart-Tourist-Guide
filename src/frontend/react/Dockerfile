# This file is to start the project as a docker
FROM node:14 AS builder
WORKDIR /app

COPY src/frontend/react/package*.json ./

RUN npm install

COPY src/frontend/react .

RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
