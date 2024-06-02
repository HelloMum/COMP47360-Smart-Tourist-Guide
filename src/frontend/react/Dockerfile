# Stage 1: Build the application
FROM node:21 as build

WORKDIR /app

# Copy package.json and package-lock.json if present
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the application
FROM node:21-alpine

WORKDIR /app

COPY --from=build /app/build /app/build
COPY package*.json ./

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
