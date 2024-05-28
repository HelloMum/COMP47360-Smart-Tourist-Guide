# Settings for the frontend container
FROM node:16-alpine AS build
WORKDIR /app
COPY .. .
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
