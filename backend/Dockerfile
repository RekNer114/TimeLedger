FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml .
COPY src/ ./src/

run mvn clean package -DskipTests

from eclipse-temurin:21-jre
WORKDIR /app

COPY --from=build /app/target/time-ledger-0.0.1-SNAPSHOT.jar .

expose 8080

CMD ["java", "-jar", "time-ledger-0.0.1-SNAPSHOT.jar"]

