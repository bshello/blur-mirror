# 프로젝트 소개 md

# BLUR - 이성 매칭 사이트

---

## SSAFY 8기 2학기 공통 프로젝트 - BLUR

![1](/uploads/e39a70088da0219afcd776efff0ad640/1.jpg)

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

![2](/uploads/0facf8f4e70d460e1f032f6c34fbe5db/2.jpg)

- ERD

![3](/uploads/15c172581cdb1da3ac51b8790ec0a9a6/3.png)

- [캐시서버 사용 이유 및 Redis 선택 이유]()


## 피그마

---

### Landing Page

![4](/uploads/38f281c33a2164bc176f1ecf715ff0cc/4.jpg)
### Start Page

![5](/uploads/1894578f57854128d0eb4ed003bcad73/5.png)

### Start Page - Sign In

![6](/uploads/ede266bbaffe278f133db1e70bef0cbb/6.png)

### Start Page - Sign Up

![7](/uploads/159882546fb68e956aa476f44c28a1e6/7.png)

### Start Page - Searching Password

![8](/uploads/bcd5e32152233981a053c53026a0c793/8.png)

### Home Page

- 사진과 차트 캐러셀 표현
- 툴팁 표현

![9](/uploads/e163617d45d7d69ca415fc5fe7eec824/9.png)

![10](/uploads/ee4fbed4c7c53640b175223b4c293509/10.png)

### Meeting Page - Not Matching In

- 매칭을 잡는 중일 때

![11](/uploads/194a456e32f20b23ac0681decf64ff76/11.jpg)

- 매칭이 잡혔을 때

![12](/uploads/40045d9cd197bd7c1dad65de11bb3c05/12.png)

### Meeting Page - Matching In

![13](/uploads/67f2269171361efe2f0be2b95ec3e31b/13.png)

- 나의 캠 상단의 이모지 버튼 눌르게 될 때
  - 이모지가 여러개 펼쳐지며, 클릭 시 상대방 카메라에 표현이 되도록 구현할 것
- 나의 캠/상대방 캠 하단의 토글버튼 구현
  - 카메라 종류 선택/카메라 온오프/마이크 온오프/ 소리 음량 조절/ 신고 버튼 구현

![14](/uploads/35ecf1d5f09e6a92ba10fc4fa33d2198/14.png)

- 상대방 캠 상단의 전구 버튼을 눌르게 될 때
  - 상대방이 프로필에서 설정한 관심사 태그 표시

![15](/uploads/651e6740a498591ebf5e585a8282b781/15.png)

- 일정 시간이 지났을 때
  - 상대방이 채탕창에 추가 됨

![16](/uploads/fe282d1cc34f45c8dfe2c1d5cb2d572d/16.png)

- 블러 효과가 옅어질 때마다
  - Progress bar 중앙에 블러 효과가 옅어진다는 문구 표시

![17](/uploads/f115da87561ab1c8a8a38063ef3ab80e/17.png)

### Chatting

- 상단 메뉴바를 클릭 시, 채팅 모달 생성

![18](/uploads/495bba64b2c846bfeaa7928214596f3c/18.png)

- 상대방과 연결된 채팅방 클릭시, 화면 중앙에 채팅 모달 구현

![19](/uploads/dcc258424078a7eba816e7a3944c7555/19.png)

### Profile Page

- 자기소개/이름/성별/관심사/프로필 이미지를 설정 및 변경
- 다른 사람의 경우에도 해당 페이지 확인가능(Read Only)

![20](/uploads/8d5d7f51ffb69c617a2ee8185496339f/20.png)

- 관심사 설정 후 페이지

![21](/uploads/04bca03c1ea60c5ab752bcc6dcb72df7/21.png)

- 프로필 수정 모달

![22](/uploads/f8c0c43996517bf8c3393452b7c51f9b/22.png)
- 환경설정 모달

![23](/uploads/3fbb4c2050a08ae230a96ce35f726867/23.png)

# 백앤드 디렉토리 구조

![Untitled](/uploads/893723128e634378976b0e604e4f2beb/Untitled.png)

![Untitled__1_](/uploads/36c87d2387fd64b927f68a55cb5b1402/Untitled__1_.png)

![Untitled__2_](/uploads/f2078a549efa4c342239697a624d92bb/Untitled__2_.png)

![Untitled__3_](/uploads/e56dfd48596038956c4932f308e88bee/Untitled__3_.png)

![Untitled__10_](/uploads/47d2068efe039d8dd167596ca62becdc/Untitled__10_.png)

![Untitled__11_](/uploads/03ba0fd1afe8f1fabbad620b5fa32f7b/Untitled__11_.png)

---

# 프론트엔드 디렉토리 구조

![Untitled](/uploads/cfb391affa8ae6d467b30d8d127bdb14/Untitled.png)

![Untitled__1_](/uploads/49e36a26e76648d09c8fe64ec67c8a08/Untitled__1_.png)

![Untitled__2_](/uploads/0e55ee7ac9bb9becfb1c7e6675f4e639/Untitled__2_.png)

![Untitled__3_](/uploads/66eca26202e0fc16b1d9165499fb08d1/Untitled__3_.png)


---
