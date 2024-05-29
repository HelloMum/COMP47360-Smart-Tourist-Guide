FROM node:14 AS builder

WORKDIR /app/react

COPY package*.json ./

RUN npm install

COPY . .


RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/react/build /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
