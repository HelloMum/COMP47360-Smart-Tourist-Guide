
FROM gradle:8.7.0-jdk21 AS builder

WORKDIR /app

COPY . .

RUN gradle build --no-daemon

FROM openjdk:21-jdk-slim

WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
