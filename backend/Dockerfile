FROM jelastic/maven:3.9.5-openjdk-21 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

ENV SPRING_PROFILES_ACTIVE=default
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
