### 오목 웹사이트

![오목-011](https://github.com/BaeDongWoo/omok-web/assets/114900672/13abc2f1-68f9-479b-acba-6eeaa520e97f)

### 배경 

교육 과정을 진행할 때 오목을 판별하는 로직을 작성했던 경험을 토대로 채팅 기능처럼 양방향으로 통신하는 서비스를 경험해 보기 위해 만들어본 웹 사이트입니다. 업데이트되는 데이터를 해당 서비스의 사용자들에게 실시간으로 제공하기 위해 Firebase의 Snapshot을 사용해 개발했습니다. 간단하게 기획한 프로젝트이지만 서버에서 공통으로 관리해야 하는 데이터와 그에 따라 서로 다르게 처리하는 경험을 할 수 있었던 프로젝트입니다. 또한, 오목 게임에 사용될 보드와 돌을 그리기 위한 Canvas API도 함께 경험해 볼 수 있었습니다.
  
### 🚀링크 

https://bdw-omok.vercel.app/

### 📅기간

2023.02.26 ~ 2024.03.08

### 😄개발 인원

1인 프로젝트

### 🔨기술 스택
<div align=left>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> 
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/styled_components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"><br/>
<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">
<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
</div>

### 📓 서비스 화면

![image](https://github.com/BaeDongWoo/omok-web/assets/114900672/073f43e2-8522-467e-b857-0f7cade13fad)


### 💡주요 기능

- firebase auth 익명 로그인
- 방생성 기능(비밀방)
- 오목 여부 판

#### 파일 구조

```bash
├── src
│   └── components               
│     └── common
│       └── background             
|     └── main
│       ├── board
│       └── userprofile
|     ├── start
|     └── waiting
|       └── room
|     └── signup
│   ├── config
│   ├── pages
│   └── styled
``` 


#### 컬렉션 구조

```bash
├── rooms  - collection (방 목록)
│   ├── roomid - doc (생성한 방의 밀리초)
│   	├── board - field <Array> (보드판에 놓인 돌의 정보)
│   	├── checked - field <Boolean> (비밀번호 여부)
│			├── pwd - field <String> (방의 비밀번호)
│			├── game - field <Map> (게임 진행 상황)
│			├── nickname  - field  <Array> (닉네임 목록)
│			├── ready  - field  <Array> (유저 레디 정보)
│			├── roomTitle  - field <String> (방의 제목)
│			└── users - field <Array> (입장한 유저 목록)
```

본 서비스에서 사용하는 Firebase DataBase 컬렉션 구조는 다음과 같습니다.
최상위 컬렉션 rooms는 생성된 방의 목록을 가지고 있으며, 방 번호에 해당하는 roomId에는 게임 진행과 관련된 모든 정보를 담고 있습니다. 
해당 방에서 이벤트가 발생하거나 component가 unmount 될 때 해당 문서를 업데이트 또는 삭제되도록 구현 했습니다.


#### 익명 로그인

- 서비스 사용자는 닉네임을 입력해 대기실로 입장합니다.
- firebase의 익명 로그인 기능을 통해 로그인한 사용자는 고유 UID를 발급 받습니다.
- 해당 아이디는 사용자가 방에 입장할때 사용하게 됩니다.
  
![image](https://github.com/BaeDongWoo/omok-web/assets/114900672/75a82ffb-5e8e-41e3-bf6e-5b2e6de3dabc)


#### 대기방

- 사용자는 방을 새로 생성하거나 기존에 생성된 방에 입장할 수 있습니다.
- 방은 최대 2명까지 입장 가능하며 모두 입장시 입장이 불가합니다.
- 비밀번호 설정을 통해 비밀방 기능을 사용할 수 있습니다.
- 방을 생성할때 해당 방의 고유 아이디를 부여하기 위해 getTime() 함수를 사용했습니다.

#### 게임 진행

- 두명의 사용자가 방에 입장후 모두 레디 버튼을 클릭하면 5초뒤 게임이 시작됩니다.
- 게임이 시작되면 레디 버튼은 비활성화 되고 입장한 순서대로 흑돌, 백돌을 가지고 게임을 진행합니다.
- 오목을 완성하면 게임을 종료하고 해당 방의 데이터를 초기화 하고 레디 버튼을 활성화 합니다.
- 이벤트가 발생할 때마다 변하는 데이터를 감지하고 보드를 재 렌더링 하기위해 snapshot을 사용했습니다.

#### 서비스 영상

---  작성중입니다... ---
