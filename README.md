# 프로젝트 소개 md

# BLUR - 이성 매칭 사이트

---

## SSAFY 8기 2학기 공통 프로젝트 - BLUR

![mockup1.jpg](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%20md%206f1198312b9449cd872aa2e1c87f41ff/mockup1.jpg)

## 개요

---

BLUR는 블라인드 소개팅과 사람들이 대화할 때 나는 소리인 ‘BLAH BLAH(블라 블라)’를 합쳐 탄생한 소개팅 서비스 입니다. 외모가 아닌 대화로써 자신의 매력을 나타내며 재밌고 설레는 소개팅을 만나 볼 수 있습니다.

## 배경

---

 코로나19를 거치면서 현실 소개팅보다 쉬운 접근성, 만남의 다양성을 장점으로 내세운 비대면 소개팅 서비스는 가파르게 성장하고  있습니다.

짧은 시간 내에 상대방을 판단하는 소개팅의 특성 상 소개팅의 성공에는 외형적인 매력이 우선적으로 고려됩니다. 상황에 따라서는 자신의 다른 매력을 어필 할 기회조차 얻지 못합니다.

따라서 BLUR는 외형적인 매력보다 내면적인 매력을 보여 줄 수 있는 대화에 집중할 수 있도록 하고, 그 속에서 색다른 재미와 설램을 느낄 수 있는 서비스를 기획했습니다.

(자료 참고 : **[온라인 데이팅 서비스 이용 실태조사 - 한국소비자원](https://www.kca.go.kr/smartconsumer/board/download.do?menukey=7301&fno=10029769&bid=00000146&did=1003110919)**)

## 주요기능

---

### 관심사 추천

**평소 관심 있던 분야를 추가해보세요.**

- 기존유저의 데이터를 바탕으로 개인 맞춤 관심사를 추천해줍니다.
- 화상미팅시에 입력된 관심사를 바탕으로 도움을 줍니다.

### 매칭

**거리와 연령대등의 매칭 조건을 입력후 매칭을 시작해보세요**

- 유저의 활동데이터를 바탕으로 유저의 매력도를 자체적으로 판단합니다.
- 매칭 조건에 부합하는 사람중 매력도가 높은 사람을 우선적으로 매칭합니다.

### 화상 미팅

**외모에 가려진 자신의 매력을 표현해보세요.**

- 이성의 관심사를 대화주제로 추천해줌으로써 대화를 이어나가기에 더욱 수월해질것입니다.
- 대화 시간에 따라 블러효과는 점차 옅어지며,최종단계에 진입을 위해선 양측의 동의가 필요합니다.
- 최종단계 진입후, 모든 블러효과 해제와 함께 1대1 채팅방이 개설됩니다.

### 채팅

**못다한 이야기를 채팅방에서 이어가보세요.**

- 채팅방 개설과 동시에 서비스의 개입은 중단되며, 향후 연락의 지속여부는 유저에게 전적으로 일임합니다.

## 주요기술스택

---

### Frontend

- Node
- React
- Redux

### Backend

- Spring
- Spring Web
- Spring Security
- Spring Data JPA
- WebSocket

### DB

- MariaDB(MySQL)
- Redis

### Server

- Docker
- Jenkins
- Amazon EC2
- NGINX

### WebRTC

- OpenVidu
- Kurento

## 협업툴

---

- Gitlab
  - git-flow 방식 기반의 코드 버전 관리
  - 이슈 발생 시 해당 기능 담당자 끼리 토론
- JIRA
  - 매주 목표량 달성을 위한 Sprint 진행
  - 업무 할당량 별로 Story Point 설정 후 진행
- 회의
  - 매일 아침 프로젝트 진행 전에 30분정도의 스크럼 회의를 통해, 전날 목표 달성량과 당일 해야 할 업무에 대한 브리핑
  - 금요일에는 주말 동안 할당량을 정해서 해오는 형식으로 진행
  - 서로 소통을 할 부분이 있으면, 즉석으로 담당자끼리 회의 소통 진행
- Notion
  - 매일 스크럼 회의를 기록하는 회의록 작성
  - 컨벤션 정리

## 팀원 역할 분배

---

### 프론트엔드

- 김성훈
- 김창겸
- 송대현

### 백엔드

- 강정훈
- 김원웅
- 최동호

## 프로젝트 산출물

---

- 로그인 시퀀스 다이어그램

![springboot-oauth.jpg](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%20md%206f1198312b9449cd872aa2e1c87f41ff/springboot-oauth.jpg)

- ERD

![blur_20230202_153150.png](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%20md%206f1198312b9449cd872aa2e1c87f41ff/blur_20230202_153150.png)

- [캐시서버 사용 이유 및 Redis 선택 이유]()

[캐시서버](https://www.notion.so/7dbabaacacd74f01bc048f28903be833)

## 피그마

---

### Landing Page

![1.jpg](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%20md%206f1198312b9449cd872aa2e1c87f41ff/1.jpg)

### Start Page

![startpage.png](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%20md%206f1198312b9449cd872aa2e1c87f41ff/startpage.png)

### Start Page - Sign In

![start Page - Sign In.png](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%20md%206f1198312b9449cd872aa2e1c87f41ff/start_Page_-_Sign_In.png)

### Start Page - Sign Up

![start Page - Sign Up.png](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%20md%206f1198312b9449cd872aa2e1c87f41ff/start_Page_-_Sign_Up.png)

### Start Page - Searching Password

![start Page - Searching Password.png](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%20md%206f1198312b9449cd872aa2e1c87f41ff/start_Page_-_Searching_Password.png)

### Home Page

- 사진과 차트 캐러셀 표현
- 툴팁 표현

![Home Page.png](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%20md%206f1198312b9449cd872aa2e1c87f41ff/Home_Page.png)

![Home Page2.png](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%20md%206f1198312b9449cd872aa2e1c87f41ff/Home_Page2.png)

### Meeting Page - Not Matching In

- 매칭을 잡는 중일 때

![Meeting Page - 24.jpg](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%20md%206f1198312b9449cd872aa2e1c87f41ff/Meeting_Page_-_24.jpg)

- 매칭이 잡혔을 때

![Untitled](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%20md%206f1198312b9449cd872aa2e1c87f41ff/Untitled.png)

### Meeting Page - Matching In

![Untitled](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%20md%206f1198312b9449cd872aa2e1c87f41ff/Untitled%201.png)

- 나의 캠 상단의 이모지 버튼 눌르게 될 때
  - 이모지가 여러개 펼쳐지며, 클릭 시 상대방 카메라에 표현이 되도록 구현할 것
- 나의 캠/상대방 캠 하단의 토글버튼 구현
  - 카메라 종류 선택/카메라 온오프/마이크 온오프/ 소리 음량 조절/ 신고 버튼 구현

![Untitled](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%20md%206f1198312b9449cd872aa2e1c87f41ff/Untitled%202.png)

- 상대방 캠 상단의 전구 버튼을 눌르게 될 때
  - 상대방이 프로필에서 설정한 관심사 태그 표시

![Untitled](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%20md%206f1198312b9449cd872aa2e1c87f41ff/Untitled%203.png)

- 일정 시간이 지났을 때
  - 상대방이 채탕창에 추가 됨

![Untitled](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%20md%206f1198312b9449cd872aa2e1c87f41ff/Untitled%204.png)

- 블러 효과가 옅어질 때마다
  - Progress bar 중앙에 블러 효과가 옅어진다는 문구 표시

![Untitled](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%20md%206f1198312b9449cd872aa2e1c87f41ff/Untitled%205.png)

### Chatting

- 상단 메뉴바를 클릭 시, 채팅 모달 생성

![## (2).png](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%20md%206f1198312b9449cd872aa2e1c87f41ff/_(2).png)

- 상대방과 연결된 채팅방 클릭시, 화면 중앙에 채팅 모달 구현

![Untitled](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%20md%206f1198312b9449cd872aa2e1c87f41ff/Untitled%206.png)

### Profile Page

- 자기소개/이름/성별/관심사/프로필 이미지를 설정 및 변경
- 다른 사람의 경우에도 해당 페이지 확인가능(Read Only)

![Untitled](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%20md%206f1198312b9449cd872aa2e1c87f41ff/Untitled%207.png)

- 관심사 설정 후 페이지

![Untitled](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%20md%206f1198312b9449cd872aa2e1c87f41ff/Untitled%208.png)

- 프로필 수정 모달

![Untitled](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%20md%206f1198312b9449cd872aa2e1c87f41ff/Untitled%209.png)

- 환경설정 모달

![Untitled](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%20md%206f1198312b9449cd872aa2e1c87f41ff/Untitled%2010.png)

# 백앤드 디렉토리 구조

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

# 프론트엔드 디렉토리 구조

|   App.css
|   App.js
|   App.test.js
|   index.js
|   reportWebVitals.js
|   setupTests.js
|   test.css.map
|   test.txt
|
+---components
|   +---Footer
|   |       index.css
|   |       index.css.map
|   |       index.jsx
|   |       index.scss
|   |
|   \---Header
|           index.css
|           index.css.map
|           index.jsx
|           index.scss
|
+---pages
|   +---Home
|   |   |   index.css
|   |   |   index.css.map
|   |   |   index.jsx
|   |   |   index.scss
|   |   |
|   |   +---BlurInfo
|   |   |       blurInfo.css
|   |   |       blurInfo.css.map
|   |   |       blurInfo.jsx
|   |   |       blurInfo.scss
|   |   |
|   |   +---Slide1
|   |   |       slide1.jsx
|   |   |
|   |   +---Slide2
|   |   |       slide2.jsx
|   |   |
|   |   \---Slide3
|   |           slide3.jsx
|   |
|   +---Meeting
|   |   |   Counter.jsx
|   |   |   index.css
|   |   |   index.css.map
|   |   |   index.jsx
|   |   |   index.scss
|   |   |
|   |   +---MeetingIn
|   |   |   |   index.css
|   |   |   |   index.css.map
|   |   |   |   index.jsx
|   |   |   |   index.scss
|   |   |   |
|   |   |   +---ProgressBar
|   |   |   |       index.css
|   |   |   |       index.css.map
|   |   |   |       index.jsx
|   |   |   |       index.scss
|   |   |   |
|   |   |   \---Timer
|   |   |           index.css
|   |   |           index.css.map
|   |   |           index.jsx
|   |   |           index.scss
|   |   |
|   |   \---MeetingNotIn
|   |           index.css
|   |           index.css.map
|   |           index.jsx
|   |           index.scss
|   |
|   +---MyInfo
|   |   |   index.css
|   |   |   index.css.map
|   |   |   index.jsx
|   |   |   index.scss
|   |   |
|   |   +---Hash
|   |   |       Hash.css
|   |   |       Hash.css.map
|   |   |       Hash.jsx
|   |   |       Hash.scss
|   |   |
|   |   \---MyInfoModal
|   |       |   myInfoModal.css
|   |       |   myInfoModal.css.map
|   |       |   myInfoModal.jsx
|   |       |   myInfoModal.scss
|   |       |
|   |       +---SetModal
|   |       |       setmodal.css
|   |       |       setmodal.css.map
|   |       |       setmodal.jsx
|   |       |       setmodal.scss
|   |       |
|   |       \---style
|   |           \---setRange
|   |                   setrange.css
|   |                   setrange.css.map
|   |                   setrange.jsx
|   |                   setrange.scss
|   |
|   \---Start
|       |   index.css
|       |   index.css.map
|       |   index.jsx
|       |   index.scss
|       |
|       +---Alert
|       |       alert.css
|       |       alert.css.map
|       |       alert.js
|       |       alert.scss
|       |
|       +---ModalWrap
|       |       modalWrap.css
|       |       modalWrap.css.map
|       |       modalWrap.js
|       |       modalWrap.scss
|       |
|       +---SearchPw
|       |       searchPw.css
|       |       searchPw.css.map
|       |       searchPw.js
|       |       searchPw.scss
|       |
|       +---SignIn
|       |       signIn.css
|       |       signIn.css.map
|       |       signIn.jsx
|       |       signIn.scss
|       |       signInWrap.jsx
|       |
|       \---SignUp
|               signIn.css
|               signUp.css
|               signUp.css.map
|               signUp.js
|               signUp.scss
|
+---reducer
|       counter.jsx
|       index.jsx
|       MToggle.jsx
|       userEdit.jsx
|
\---style
common.css
common.css.map
common.scss
normalize.css
normalize.css.map
normalize.scss

---