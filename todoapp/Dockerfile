FROM openjdk:11
# Environment Variable that defines the endpoint of sentiment-analysis python api: 
ADD target/todoapp-0.0.1-SNAPSHOT.jar /
EXPOSE 8080
CMD ["java", "-jar", "todoapp-0.0.1-SNAPSHOT.jar"]