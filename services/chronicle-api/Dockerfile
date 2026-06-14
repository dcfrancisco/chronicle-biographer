# syntax=docker/dockerfile:1

FROM maven:3.9.11-eclipse-temurin-21 AS build

WORKDIR /workspace

COPY pom.xml .
COPY modules/chronicle-domain/pom.xml modules/chronicle-domain/pom.xml
COPY modules/chronicle-infrastructure/pom.xml modules/chronicle-infrastructure/pom.xml
COPY modules/chronicle-application/pom.xml modules/chronicle-application/pom.xml
COPY modules/chronicle-ingestion/pom.xml modules/chronicle-ingestion/pom.xml
COPY services/chronicle-api/pom.xml services/chronicle-api/pom.xml

COPY modules/chronicle-domain/src modules/chronicle-domain/src
COPY modules/chronicle-infrastructure/src modules/chronicle-infrastructure/src
COPY modules/chronicle-application/src modules/chronicle-application/src
COPY modules/chronicle-ingestion/src modules/chronicle-ingestion/src
COPY services/chronicle-api/src services/chronicle-api/src

# Include OpenAPI spec so openapi-generator can access it during build
COPY openapi openapi

RUN mvn -pl services/chronicle-api -am -DskipTests package spring-boot:repackage

FROM eclipse-temurin:21-jre-jammy AS runtime

WORKDIR /app

COPY --from=build /workspace/services/chronicle-api/target/chronicle-api-0.1.0-SNAPSHOT.jar /app/app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
