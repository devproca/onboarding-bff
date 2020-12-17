FROM openjdk:13-jdk-alpine
EXPOSE 8081
ARG JAR_FILE=build/libs/onboarding-bff-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
