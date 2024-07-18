FROM eclipse-temurin:21-jdk AS dependencies

WORKDIR /app

COPY gradlew /app/gradlew
COPY gradle /app/gradle
COPY build.gradle /app/build.gradle
COPY settings.gradle /app/settings.gradle

RUN chmod +x gradlew

RUN ./gradlew dependencyUpdates --no-daemon

FROM dependencies AS builder

WORKDIR /app

COPY . .

RUN ./gradlew build --no-daemon

FROM eclipse-temurin:21-jre

WORKDIR /app

# This is a workaround for the missing dependencies to run the model, it will slow down the building process

RUN apt-get update && apt-get install -y libgomp1

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
