FROM openjdk:11-slim
VOLUME /tmp
COPY ./build/libs/blur-match-0.0.1-SNAPSHOT.jar BlurMatch.jar
ENTRYPOINT [ "java", "-jar", "BlurMatch.jar" ]

# ./gradlew clean build 먼저 시행
# docker build --tag gangesriver/blur-match:0.1 .
# docker push gangesriver/blur-match:0.1
# docker pull gangesriver/blur-match:0.1
# docker run -d --network ecommerce-network --name blur-match -e "eureka.client.serviceUrl.defaultZone=http://blur-discover:8761/eureka/" gangesriver/blur-match:0.1