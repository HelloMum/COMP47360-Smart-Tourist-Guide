FROM gradle:8.7.0-jdk11 AS builder

WORKDIR /app

COPY build.gradle .
COPY settings.gradle .
COPY src src

RUN gradle build

FROM adoptopenjdk/openjdk11:alpine-slim

WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
