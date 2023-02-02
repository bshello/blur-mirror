# BLUR - 이성 매칭 사이트

-----

## SSAFY 8기 2학기 공통 프로젝트 - BLUR



## BLUR - 배경

--- 



## BLUR - 개요

---

## 주요기능

--- 

## 주요기술

--- 

Frontend



Backend



Server



## 협업툴

--- 

## 팀원 역할 분배

---

## 프로젝트 산출물

---

## 피그마

---

## 백엔드 디렉토리 구조

+---blur-apigateway
|   \---main
|       +---java
|       |   \---com
|       |       \---blur
|       |           \---apigateway
|       |               |   BlurApigatewayApplication.java
|       |               |   
|       |               +---filter
|       |               |       AuthorizationHeaderFilter.java
|       |               |       GlobalFilter.java
|       |               |       
|       |               +---handler
|       |               |       GlobalExceptionHandler.java
|       |               |       
|       |               \---security
|       |                       JwtTokenProvider.java
|       |                       
|       \---resources
|               application.yml
|               
+---blur-business
|   \---main
|       +---java
|       |   \---com
|       |       \---blur
|       |           \---business
|       |               |   BlurBusinessApplication.java
|       |               |   
|       |               +---api
|       |               |   +---controller
|       |               |   |       AuthController.java
|       |               |   |       ChattingController.java
|       |               |   |       MatchingController.java
|       |               |   |       ProfileController.java
|       |               |   |       StatisticController.java
|       |               |   |       UserController.java
|       |               |   |       WebSocketController.java
|       |               |   |       
|       |               |   \---dto
|       |               |       |   EmailAuthDto.java
|       |               |       |   TokenDto.java
|       |               |       |   UserDto.java
|       |               |       |   UserProfileDto.java
|       |               |       |   
|       |               |       +---request
|       |               |       |       LoginRequestDto.java
|       |               |       |       
|       |               |       \---response
|       |               |               ErrorResponse.java
|       |               |               LoginResponseDto.java
|       |               |               
|       |               +---config
|       |               |       CorsConfig.java
|       |               |       EmailConfig.java
|       |               |       ImageConfig.java
|       |               |       JpaConfig.java
|       |               |       SwaggerConfig.java
|       |               |       WebMvcConfig.java
|       |               |       WebSocketConfig.java
|       |               |       
|       |               +---entity
|       |               |       Category.java
|       |               |       ChatHeader.java
|       |               |       ChatRoomUser.java
|       |               |       EmailAuth.java
|       |               |       Interest.java
|       |               |       MatchingLog.java
|       |               |       MatchingSetting.java
|       |               |       MatchMakingRating.java
|       |               |       Token.java
|       |               |       User.java
|       |               |       UserInterest.java
|       |               |       UserProfile.java
|       |               |       
|       |               +---exception
|       |               |       UnAuthorizedException.java
|       |               |       
|       |               +---repository
|       |               |       EmailRepository.java
|       |               |       TokenRepository.java
|       |               |       UserProfileRepository.java
|       |               |       UserRepository.java
|       |               |       
|       |               \---service
|       |                       EmailService.java
|       |                       JwtService.java
|       |                       JwtServiceImpl.java
|       |                       PasswordService.java
|       |                       ProfileService.java
|       |                       TokenService.java
|       |                       UserService.java
|       |                       
|       \---resources
|               application-smtp.properties
|               application.properties
|               
+---blur-chat
|   \---main
|       +---java
|       |   \---com
|       |       \---blur
|       |           \---chat
|       |               |   BlurChatApplication.java
|       |               |   
|       |               +---api
|       |               |   +---contorller
|       |               |   |       ChatDataController.java
|       |               |   |       StompChatController.java
|       |               |   |       
|       |               |   +---dto
|       |               |   |       ChatMessageSaveDto.java
|       |               |   |       ChatPagingDto.java
|       |               |   |       ChatPagingResponseDto.java
|       |               |   |       
|       |               |   +---entity
|       |               |   |       Chat.java
|       |               |   |       
|       |               |   +---repository
|       |               |   |       ChatJdbcRepository.java
|       |               |   |       ChatRepository.java
|       |               |   |       ChatRoomRepository.java
|       |               |   |       
|       |               |   \---service
|       |               |           ChatRedisCacheService.java
|       |               |           ChatRoomService.java
|       |               |           
|       |               +---config
|       |               |   +---websocket
|       |               |   |   \---redis
|       |               |   |           RedisConfig.java
|       |               |   |           
|       |               |   \---websokect
|       |               |           StompHandler.java
|       |               |           StompWebSocketConfig.java
|       |               |           
|       |               \---utils
|       |                       ChatCachingInRedisScheduling.java
|       |                       ChatUtils.java
|       |                       ChatWriteBackScheduling.java
|       |                       
|       \---resources
|               application.properties
|               
\---blur-user-service
    \---main
        +---java
        |   \---com
        |       \---blur
        |           \---userservice
        |               |   BlurUserService1Application.java
        |               |   
        |               +---api
        |               |   +---controller
        |               |   |       AuthController.java
        |               |   |       UserController.java
        |               |   |       
        |               |   +---dto
        |               |   |       EmailAuthDto.java
        |               |   |       ErrorResponse.java
        |               |   |       LoginModel.java
        |               |   |       
        |               |   +---entity
        |               |   |       EmailAuth.java
        |               |   |       User.java
        |               |   |       UserDto.java
        |               |   |       UserRefreshToken.java
        |               |   |       
        |               |   +---repository
        |               |   |       EmailRepository.java
        |               |   |       UserRefreshTokenRepository.java
        |               |   |       UserRepository.java
        |               |   |       
        |               |   \---service
        |               |           EmailService.java
        |               |           PasswordService.java
        |               |           UserService.java
        |               |           
        |               +---common
        |               |       ApiResponse.java
        |               |       ApiResponseHeader.java
        |               |       
        |               +---config
        |               |   |   EmailConfig.java
        |               |   |   
        |               |   +---properties
        |               |   |       AppProperties.java
        |               |   |       CorsProperties.java
        |               |   |       
        |               |   \---security
        |               |           JwtConfig.java
        |               |           SecurityConfig.java
        |               |           
        |               +---oauth
        |               |   +---entity
        |               |   |       AuthToken.java
        |               |   |       AuthTokenProvider.java
        |               |   |       ProviderType.java
        |               |   |       RoleType.java
        |               |   |       UserPrincipal.java
        |               |   |       
        |               |   +---exception
        |               |   |       OAuthProviderMissMatchException.java
        |               |   |       RestAuthenticationEntryPoint.java
        |               |   |       TokenValidFailedException.java
        |               |   |       
        |               |   +---filter
        |               |   |       TokenAuthenticationFilter.java
        |               |   |       
        |               |   +---handler
        |               |   |       OAuth2AuthenticationFailureHandler.java
        |               |   |       OAuth2AuthenticationSuccessHandler.java
        |               |   |       TokenAccessDeniedHandler.java
        |               |   |       
        |               |   +---info
        |               |   |   |   OAuth2UserInfo.java
        |               |   |   |   OAuth2UserInfoFactory.java
        |               |   |   |   
        |               |   |   \---impl
        |               |   |           GoogleOAuth2UserInfo.java
        |               |   |           KakaoOAuth2UserInfo.java
        |               |   |           NaverOAuth2UserInfo.java
        |               |   |           
        |               |   +---repository
        |               |   |       OAuth2AuthorizationRequestBasedOnCookieRepository.java
        |               |   |       
        |               |   \---service
        |               |           CustomOAuth2UserService.java
        |               |           CustomUserDetailsService.java
        |               |           
        |               \---utils
        |                       CookieUtil.java
        |                       HeaderUtil.java
        |                       
        \---resources
                application-smtp.properties
                application.yml
                log4j2.xml
                


---
