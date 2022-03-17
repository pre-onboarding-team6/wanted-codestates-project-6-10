# [**Project 8**] 휴먼스케이프 실습 과제

## 🔗 배포 주소

- 아래 URL을 클릭하면 배포된 페이지로 이동합니다.

배포링크


<br>

## ****⚙****개발 환경

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/emotion/styled-C071BE.svg?&style=for-the-badge&logo=emotion&logoColor=white">

<br>

## 🧑 참여 멤버

- 김도연 : api 호출 최적화 
- 유지수 : redux 구현
- 박세은 : Form 컴포넌트 및 전체 UI
- 유혜정 : Dropdown 컴포넌트 및 키보드 이동 기능

<br>

## 🕹  설치 및 시작방법

1. github repo 이동
2. code 버튼 클릭
3. HTTPS url 복사 (클립보드 버튼 클릭)
4. 컴퓨터에서 커맨트창 띄우기
5. 원하는 폴더 위치로 이동
6. git clone
7. wanted-codestates-project-6-10 폴더 이동
8. code .
9. 에디터 열렸으면 터미널 open

```
# install dependencies
 $ npm install

# serve with hot reload at localhost:3000
 $ npm start
```

<br>

## 📝 구현 목록 및 회고

단어를 검색하여 단어가 포함되어 있는 질병을 리스트 결과로 표시하는 서비스

### 1. Redux 구현

Redux를 이용하여 api 호출, 응답 데이터를 전역 상태로 관리

- 구현한 방법과 이유

    - 전역 상태 관리 툴: redux의 장황한 문법을 줄여 가독성을 높이기 위해 redux toolkit 사용

    - 구현 내용: <br>
      먼저 검색한 단어를 이용하여 api 요청을 하고, 받은 응답을 전역 store에 저장하고자했다.
      
      api 요청 즉, 비동기 작업을 수행하는 것이므로 middleware가 필요했다.

      toolkit을 사용하고자 하였으므로 thunk를 이용한 메서드를 사용하여 비동기 처리를 해주었다.

      extraReducers에서 Promise status에 따른 처리를 각각 해주었다.

      pending 상태일 때는 loading만 true, 데이터가 정상 도착하여 fulfilled가 되었으면 payload를 data에 할당하고 loading을 false로 변경한다. reject가 되었을 때는 error 내용을 저장하고, 통신도 끝난 상태이므로 loading 또한 false로 변경한다.

- 어려웠던 점

    redux toolkit을 처음 이용해보았는데, redux의 패턴은 알고 있는데도 불구하고 축약된 느낌이라 메서드를 사용하는 데에 조금 생소한 느낌이었다.

### 2. api 호출 최적화

단어가 expire time이 지나지 않았을 때 api 요청을 하지 않고 캐시되어 있던 데이터 사용
<br>\- 로컬 캐싱 (expire 까지)
<br>\- 입력마다 호출하지 않고 호출 횟수 줄이기


- 구현한 방법과 이유

- 어려웠던 점


### 3. Form 컴포넌트 및 전체 UI

Form 컴포넌트 제작 및 전체 UI (반응형)

- 구현한 방법과 이유
	- [https://clinicaltrialskorea.com/](https://clinicaltrialskorea.com/) 의 검색 영역 클론코딩
	- 화면 크기에 따라 검색영역 디자인이 달라지도록 반응형 웹 구현

- 어려웠던 점
	- 두 가지 검색영역 디자인을 CSS Media-Query로 작성하려면 display:none/ display:block; 으로 나눠서 처리해야 하는 번거로움이 있어 react-responsive 모듈이 제공하는 useMediaQuery Hook 사용

### 4. Dropdown 구현

Dropdown 컴포넌트 제작 및 키보드 방향키를 이용하여 검색어 이동 구현

- 구현한 방법과 이유
	- 검색어를 입력하면 검색어가 포함된 추천검색어가 자동완성되도록 구현했습니다. 추천검색어는 키보드 방향키와 마우스로 접근이 가능해야 했습니다.
	- 드롭박스는 검색결과 데이터 length > 0이고 isShowing이 true일 때 열립니다. 처음에는 keyup 이벤트로 input에 검색어 입력 완료후 ‘enter’를 치면 드롭박스가 보이도록 했는데, 추천검색어 속성상 검색이 진행되는 상황에서 추천검색어가 바로바로 보이는 것이 나을 것 같다는 다른 팀원의 제안에 변경했습니다. 확실히 ux가 좋아졌습니다.
	- 키보드 네비게이션은 cursor 변수 값을 검색결과 리스트 index와 비교하는 방식으로 구현했습니다. cursor 값이 -1일 때는 키보드 네비게이션이 진행되지 않는 상태이고, 검색결과 드롭박스가 열리고 난 뒤 keydown 이벤트로 방향키가 눌리면 cursor 값이 1씩 증가(혹은 감소)시켜 검색결과 요소에 접근하는 방식입니다.
	- 마우스와 키보드 모두로 검색결과 요소에 접근이 가능하도록 하기 위해, 마우스 이동으로 검색결과 요소에 접근한다면 키보드 네비게이션은 동작하지 않도록 했습니다.

- 어려웠던 점
	- 키보드 네비게이션 등 처음 구현해보는 기능들이 있어 프로젝트 초기에는 어떻게 해야하나 막막했는데, 팀원들의 조언으로 방향을 잡을 수 있었습니다.
	- 처음에는 input에 keydown이벤트를 넣어 구현했다가 이후 useEffect를 사용해 변경했습니다. 방향키는 한 번 만 눌려도keydown이벤트가 여러번 발생하는 문제가 생겨 애를 먹었는데 cleanup함수, useCallback으로 이를 방지했습니다.
	- 키보드와 마우스 모두로 요소에 접근하는 이벤트를 처리하는 것이 까다로웠습니다. 각각의 검색결과 요소에 mousemove 이벤트가 발생할 때에는 키보드 이벤트는 동작하지 않는 것으로 처리하고, 번갈아서 요소에 접근할 때에는 마지막 요소의 index를 기억하도록 해 사용자 편의성을 높였습니다.
<br>

## 🗂 프로젝트 구조
```
📁src
│  App.js
│  index.js
│
├─📁components
│	│ Dropdown.js
│	└─SearchForm.js
│
├─📁styled
│  reset.css
│			
└─📁redux
	│ diseaseReducer.js
	└─store.js
```
