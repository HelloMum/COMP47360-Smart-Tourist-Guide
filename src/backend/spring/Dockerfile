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

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
