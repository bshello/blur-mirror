FROM openjdk:11-slim
VOLUME /tmp
COPY ./build/libs/blur-profile-0.0.1-SNAPSHOT.jar BlurProfile.jar
ENTRYPOINT [ "java", "-jar", "BlurProfile.jar" ]

# ./gradlew clean build 먼저 시행
# docker build --tag gangesriver/blur-profile:0.1 .
# docker push gangesriver/blur-profile:0.1
# docker pull gangesriver/blur-profile:0.1
# docker run --rm -d --network ecommerce-network --name blur-profile -e "eureka.client.serviceUrl.defaultZone=http://blur-discover:8761/eureka/" gangesriver/blur-profile:0.1