# [**Project 8**] 휴먼스케이프 실습 과제

## 🔗 배포 주소

- 아래 URL을 클릭하면 배포된 페이지로 이동합니다.

https://humanscape.netlify.app/


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

	https://github.com/pre-onboarding-team6/wanted-codestates-project-6-10

2. code 버튼 클릭 및 HTTPS url 복사 (클립보드 버튼 클릭)

	![2](https://user-images.githubusercontent.com/80020227/158720778-97259019-a572-4e40-905e-286f5925fc12.JPG)

3. 컴퓨터에서 커맨트창 띄우고 원하는 폴더 위치로 이동

	ex)
	```
	C:Users\username> mkdir wantedHumanscape
	C:Users\username> cd wantedHumanscape
	```

4. git clone

	```
	C:Users\username\wantedHumanscape> git clone https://github.com/pre-onboarding-team6/wanted-codestates-project-6-10.git
	```

5. wanted-codestates-project-6-10 폴더 이동 및 에디터 열기

	```
	C:Users\username\wantedHumanscape> cd wanted-codestates-project-6-10
	C:Users\username\wantedHumanscape\wanted-codestates-project-6-10> code .
	```

6. 에디터 열렸으면 터미널 open 및 다음과 같이 실행

	- install dependencies
		```
		$ npm install
		```

	- serve with hot reload at localhost:3000
		```
		$ npm start
		```

<br>

## 📝 구현

단어를 검색하여 단어가 포함되어 있는 질병을 리스트 결과로 표시하는 서비스

| 1. 검색어 입력 후 키보드로 이동 | 2. 검색어 입력 후 마우스로 이동 | 3. 검색어 매칭 단어 없을 경우 |
| --- | --- | --- |
| <img src="https://user-images.githubusercontent.com/80020227/158721671-7c260ea8-a13b-47c1-9a3a-d58d03c5ca77.gif" width="300"/> | <img src="https://user-images.githubusercontent.com/80020227/158721682-3db70eac-556e-40ad-a7ee-7f4f1ba0fc57.gif" width="300"/> | <img src="https://user-images.githubusercontent.com/80020227/158721694-5c42b064-1834-464b-be54-05cc7632125a.gif" width="300"/> |

4. 로컬 스토리지를 이용한 캐싱

	<img src="https://user-images.githubusercontent.com/80020227/158721711-364a6a68-596e-4b93-8770-ac4c4c04eed7.JPG" width="600"/>

## ☑ 회고

### 1. Redux 구현

`Redux를 이용하여 api 호출, 응답 데이터를 전역 상태로 관리`

- 구현한 방법과 이유

    - 전역 상태 관리 툴: <br>
    	redux의 장황한 문법을 줄여 가독성을 높이기 위해 redux toolkit 사용

    - 구현 내용: <br>
      먼저 검색한 단어를 이용하여 api 요청을 하고, 받은 응답을 전역 store에 저장하고자했다.
      
      api 요청 즉, 비동기 작업을 수행하는 것이므로 middleware가 필요했다.

      toolkit을 사용하고자 하였으므로 thunk를 이용한 메서드를 사용하여 비동기 처리를 해주었다.

      extraReducers에서 Promise status에 따른 처리를 각각 해주었다.

      pending 상태일 때는 loading만 true, 데이터가 정상 도착하여 fulfilled가 되었으면 payload를 data에 할당하고 loading을 false로 변경한다. reject가 되었을 때는 error 내용을 저장하고, 통신도 끝난 상태이므로 loading 또한 false로 변경한다.

- 어려웠던 점

    redux toolkit을 처음 이용해보았는데, redux의 패턴은 알고 있는데도 불구하고 축약된 느낌이라 메서드를 사용하는 데에 조금 생소한 느낌이었다.

<hr>

### 2. api 호출 최적화

`
단어가 expire time이 지나지 않았을 때 api 요청을 하지 않고 캐시되어 있던 데이터 사용
`

- 구현한 방법과 이유
    
    **<검색 결과 캐싱>**
    
    **[구현한 방법]** localStorage에 유효시간과 함께 저장하는 방식으로 구현
    
    **[이유]** 
    
    1. 서버에 캐시로 저장해보려고 했으나 API 서버에 의해 막혀있었음
    2. 다른 브라우저 창에서 검색해도 캐시된 결과를 사용할 수 있게 하기 위해 localStorage를 이용함
    
    **<input에 의한 API 요청 최적화>**
    
    **[구현한 방법]** 디바운싱을 이용하여 마지막 함수만 처리되도록 구현함
    
    **[이유]**
    
    1. 입력 중간에 불필요한 요청을 보내지 않음으로써 서버의 부담도 줄이고, 사용자가 원하는 검색어에 대한 결과만 확인할 수 있도록 input에 발생한 이벤트를 그룹으로 묶어 처리하는 디바운싱을 사용함
    2. 마지막 함수가 가지고 있는 검색어가 최종적으로 API 요청을 보내야할 검색어이기 때문에 마지막 함수를 처리함
- 어려웠던 점
    
    **<useEffect에서 발생한 무한루프>**
    
    처음에 useEffect로 검색어 입력이 바뀔 때마다 API 요청을 보내도록 구현하고, 추가로 디바운싱을 적용해야 했다. 그러면서 useEffect 의존성 배열에 timer가 추가됐는데, 그러면서 무한루프가 발생했다.
    
    원인은 timer에 매번 새로운 함수가 할당되고, 의존성 배열은 timer의 변화를 감지하기 때문이었다.
    
    이를 해결하기 위해 useEffect 안에 넣었던 API 요청 로직을 모두 밖으로 함수로 분리하여 구현하였다.
    
    **<캐싱된 값 확인하여 보여줄 값을 저장하는 로직>**
    
    처음에 한 파일로 작성할 때는 괜찮았는데, 검색한 결과를 redux에 저장하기로 해서 로직을 분리하면서 어떤 로직을 reducer에 작성할지를 결정하는데 머리 속이 정리가 안돼서 어려움을 겪었다.
    
    팀원들과 회의를 하면서 말로 설명하다보니까 어떻게 구현해야할지 정리가 돼서 원하는 로직을 구현할 수 있었다.

<hr>

### 3. Form 컴포넌트 및 전체 UI

`Form 컴포넌트 제작 및 전체 UI (반응형)`

- 구현한 방법과 이유
	- [https://clinicaltrialskorea.com/](https://clinicaltrialskorea.com/) 의 검색 영역 클론코딩
	- 화면 크기에 따라 검색영역 디자인이 달라지도록 반응형 웹 구현

- 어려웠던 점
	- 두 가지 검색영역 디자인을 CSS Media-Query로 작성하려면 display:none/ display:block; 으로 나눠서 처리해야 하는 번거로움이 있어 react-responsive 모듈이 제공하는 useMediaQuery Hook 사용

<hr>

### 4. Dropdown 구현

`Dropdown 컴포넌트 제작 및 키보드 방향키를 이용하여 검색어 이동 구현`

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
