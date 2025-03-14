## 📂 프로젝트 목록

### 1️⃣ [CRUD Todo](./crud-todo)
> **기술 스택:** `HTML` `CSS` `JavaScript`

✅ **주요 기능**  
✔ 할 일 추가, 삭제, 수정  
✔ 완료된 할 일 체크 및 스타일 변경  
✔ 전체/진행중/완료 필터링 기능  
✔ 입력 글자 수 제한 (50자)  
✔ 버튼 클릭 효과 추가  
✔ 통계 기능 (완료 개수, 진행 중 개수 카운트)

📌 **설명:**  
HTML, CSS, JavaScript를 활용하여 기본적인 CRUD 기능을 구현한 Todo 리스트 웹 애플리케이션입니다. 
직관적인 UI와 간단한 인터랙션을 통해 사용자가 손쉽게 할 일을 관리할 수 있도록 개발되었습니다.

---

### 2️⃣ [Todo UI React](./todo-ui-react)
> **기술 스택:** `React` `CSS Modules`

✅ **주요 기능**  
✔ React 기반 컴포넌트 설계  
✔ 할 일 추가, 삭제, 수정  
✔ 완료된 할 일 체크 및 스타일 변경  
✔ 전체/진행중/완료 필터링 기능  
✔ CSS Modules을 활용한 스타일 모듈화  
✔ UI 개선 및 재사용 가능한 컴포넌트 구조 적용  

📌 **설명:**  
기존의 HTML/CSS/JS 기반의 Todo 리스트를 React를 활용하여 재구성한 프로젝트입니다. 
컴포넌트 기반 아키텍처를 적용하여 유지보수성을 향상시키고, CSS Modules을 도입하여 스타일 충돌을 방지했습니다.

---

### 3️⃣ [Custom Hook Todo](./custom-hook-todo)
> **기술 스택:** `React` `Custom Hook` `LocalStorage`

✅ **주요 기능**  
✔ `useTodo.js` Custom Hook을 활용하여 상태 관리 로직을 분리  
✔ `useState`와 `useEffect`를 사용하여 할 일 목록을 관리 및 로컬 스토리지 연동  
✔ 할 일 추가, 삭제, 수정, 완료 기능을 Custom Hook 내부에서 처리  
✔ 필터 기능(전체, 진행 중, 완료)을 Custom Hook에서 구현하여 재사용성 증가  
✔ `useTodos`에서 상태와 기능을 제공하고, `App.js`에서는 UI 로직만 처리하도록 개선  

📌 **설명:**  
React의 Custom Hook을 활용하여 Todo 리스트의 상태 관리 로직을 분리한 프로젝트입니다.  
로컬 스토리지를 연동하여 새로고침 시 데이터가 유지되며, 필터 기능을 Custom Hook 내부에서 처리하여 코드의 재사용성을 높였습니다.

---

### 4️⃣ [React Native Todo](./react-native-todo)  
> **기술 스택:** `React Native` `AsyncStorage` `Expo` `React Native Calendars`

✅ **주요 기능**  
✔ 할 일 추가, 삭제, 완료 체크  
✔ 날짜별 할 일 관리 (캘린더 연동)  
✔ `AsyncStorage`를 활용한 로컬 저장 기능  
✔ 작업(Work) & 여행(Travel) 모드 선택 기능  
✔ 전체/진행 중/완료 필터링 기능  
✔ `KeyboardAvoidingView` 및 `TouchableWithoutFeedback`을 활용한 입력 UX 개선  
✔ 할 일이 많아도 확인할 수 있도록 스크롤 기능 지원 (`ScrollView` 적용) 

📌 **설명:**  
React Native와 Expo를 활용해 날짜별 할 일을 관리할 수 있는 Todo 앱입니다.  
`AsyncStorage`를 사용해 데이터를 로컬에 저장하며, `Work`와 `Travel` 모드를 지원해 할 일을 구분할 수 있습니다. 

---

### 5️⃣ [React Native Weather App](./react-native-weather)  
> **기술 스택:** `React Native` `Expo` `AsyncStorage` `Axios` `OpenWeather API` `Moment.js`

✅ **주요 기능**  
✔ 자동 완성 검색 기능 (입력한 글자가 포함된 도시 추천)  
✔ 한글 → 영어 변환 검색 지원 (한국 & 해외 도시 검색 가능)  
✔ 나라별 시간대 반영 및 현재 시간 기준 정렬된 시간별 예보 제공  
✔ 5일간의 날씨 예보 (최고/최저 기온 계산 및 표시)  
✔ 날씨 상태별 UI 변경 (배경색 & 날씨 이모티콘 적용)  
✔ `AsyncStorage` 활용해 최근 검색한 도시 저장  
✔ `KeyboardAvoidingView` 및 `TouchableWithoutFeedback`으로 UX 개선  

📌 **설명:**  
React Native와 OpenWeather API를 활용한 실시간 날씨 앱입니다.
검색한 도시의 시간대를 반영한 시간별 예보와 5일간의 날씨 예보를 제공합니다.
날씨 상태에 따라 배경색과 이모티콘이 변경되며, 최근 검색한 도시를 `AsyncStorage`에 저장할 수 있습니다.




