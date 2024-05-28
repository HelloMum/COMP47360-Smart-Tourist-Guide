# Use the official Gradle image
FROM gradle:7.3.3-jdk11 AS build
WORKDIR /app
COPY . .
RUN gradle build

FROM openjdk:11-jre-slim
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]