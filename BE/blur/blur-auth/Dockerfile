FROM openjdk:11-slim
VOLUME /tmp
COPY ./build/libs/blur-auth-0.0.1-SNAPSHOT.jar BlurAuth.jar
ENTRYPOINT [ "java", "-jar", "BlurAuth.jar" ]

# ./gradlew clean build 먼저 시행
# docker build --tag gangesriver/blur-auth:0.5 .
# docker push gangesriver/blur-auth:0.5
# docker pull gangesriver/blur-auth:0.5
# docker run --rm -d --network ecommerce-network --name blur-auth -e "eureka.client.serviceUrl.defaultZone=http://blur-discover:8761/eureka/" gangesriver/blur-auth:0.5