# 도커 컨테이너 port 정리

ex) 웹

Port: 80(접속하기 위한 포트):3000(react, spring 등 내부에서 내보내는 포트)

###### Web

Port: 80:3000

###### api-gateway-server

설명: 유효한 사용자인지 확인하고 거치는 게이트웨이 서버

Port: 8080:8080

###### business-server

설명: 기본적인 비즈니스 서버

Port: 8081:8080로할지 8081로 할지 고민

###### user-service

설명: 유저 정보 및 유저 인증서비스

Port: 8082:8082

###### Jenkins

설명: 빌드 및 배포 자동화 목적

Port: 8088:8080

###### Mysql

설명: 기본 RDBM

Port: 3306:3306

###### redis

설명: 캐시서버용 NoSql

Port: 6379:6379
