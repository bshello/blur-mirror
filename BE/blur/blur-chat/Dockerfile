FROM openjdk:11-slim
VOLUME /tmp
COPY ./build/libs/blur-chat-0.0.1-SNAPSHOT.jar BlurChat.jar
ENTRYPOINT [ "java", "-jar", "BlurChat.jar" ]   

# ./gradlew clean build 먼저 시행
# docker build --tag gangesriver/blur-chat:0.1 .
# docker push gangesriver/blur-chat:0.1
# docker pull gangesriver/blur-chat:0.1
# docker run --rm -d --network ecommerce-network --name blur-chat -e "eureka.client.serviceUrl.defaultZone=http://blur-discover:8761/eureka/" gangesriver/blur-chat:0.1