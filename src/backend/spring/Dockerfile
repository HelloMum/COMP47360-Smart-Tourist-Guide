FROM gradle:8.7.0-jdk21 AS dependencies

WORKDIR /app

COPY build.gradle .
COPY settings.gradle .

RUN gradle build --no-daemon || return 0

FROM dependencies AS builder

COPY . .

RUN gradle build --no-daemon

FROM eclipse-temurin:21-jre

WORKDIR /app

# This is a workaround for the missing dependencies to run the model, it will slow down the building process

RUN apt-get update && apt-get install -y libgomp1

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
