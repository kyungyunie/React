// 할 일을 추가하는 함수
function addTodo() {
  const input = document.getElementById("todo-input"); // 입력 필드 요소 가져오기
  const list = document.getElementById("todo-list"); // 할 일 목록 요소 가져오기

  if (input.value.trim() === "") return; // 입력값이 비어 있으면 추가하지 않음

  const li = document.createElement("li"); // 새로운 리스트 아이템 생성
  li.dataset.status = "active"; // 기본 상태를 '진행중'으로 설정

  const checkbox = document.createElement("input"); // 체크박스 요소 생성
  checkbox.type = "checkbox"; // 체크박스 타입 설정
  checkbox.classList.add("todo-checkbox"); // 클래스 추가하여 스타일 적용
  checkbox.onclick = function () {
    toggleComplete(li, span); // 체크박스 클릭 시 완료 상태 변경
  };

  const textContainer = document.createElement("div"); // 텍스트 컨테이너 생성
  textContainer.classList.add("text-container"); // 스타일 적용을 위한 클래스 추가

  const span = document.createElement("span"); // 할 일 텍스트를 표시할 요소 생성
  span.textContent = input.value; // 입력값을 텍스트로 설정
  span.setAttribute("contenteditable", "true"); // 텍스트 편집 가능하도록 설정

  textContainer.appendChild(checkbox); // 체크박스를 텍스트 컨테이너에 추가
  textContainer.appendChild(span); // 텍스트를 텍스트 컨테이너에 추가

  const buttonContainer = document.createElement("div"); // 버튼 컨테이너 생성
  buttonContainer.classList.add("button-container"); // 스타일 적용을 위한 클래스 추가

  const editButton = document.createElement("button"); // 수정 버튼 생성
  editButton.classList.add("edit"); // 스타일 적용을 위한 클래스 추가
  editButton.textContent = "수정"; // 버튼 텍스트 설정
  editButton.onclick = function () {
    span.focus(); // 버튼 클릭 시 텍스트를 수정할 수 있도록 포커스 설정
  };

  const deleteButton = document.createElement("button"); // 삭제 버튼 생성
  deleteButton.classList.add("delete"); // 스타일 적용을 위한 클래스 추가
  deleteButton.textContent = "삭제"; // 버튼 텍스트 설정
  deleteButton.onclick = function () {
    li.remove(); // 버튼 클릭 시 해당 할 일을 삭제
    updateStats(); // 통계 업데이트
  };

  buttonContainer.appendChild(editButton); // 수정 버튼을 버튼 컨테이너에 추가
  buttonContainer.appendChild(deleteButton); // 삭제 버튼을 버튼 컨테이너에 추가

  li.appendChild(textContainer); // 텍스트 컨테이너를 리스트 아이템에 추가
  li.appendChild(buttonContainer); // 버튼 컨테이너를 리스트 아이템에 추가
  list.appendChild(li); // 생성된 리스트 아이템을 목록에 추가

  input.value = ""; // 입력 필드 초기화
  updateCharCount(); // 입력 글자 수 업데이트
  updateStats(); // 통계 업데이트
}

// 할 일 완료 상태를 토글하는 함수
function toggleComplete(li, span) {
  li.classList.toggle("completed"); // 완료된 할 일에 대한 스타일 토글
  span.classList.toggle("completed-text"); // 완료된 텍스트 스타일 토글

  // 데이터 속성을 변경하여 현재 상태를 저장
  li.dataset.status = li.classList.contains("completed")
    ? "completed"
    : "active";

  updateStats(); // 통계 업데이트
}

// 필터 기능 정상 작동하도록 수정
function filterTodos(status) {
  const todos = document.querySelectorAll("#todo-list li"); // 모든 할 일 요소 가져오기

  todos.forEach((todo) => {
    if (status === "all") {
      todo.style.display = "flex"; // 전체 보기 모드에서는 모든 항목 표시
    } else if (status === "active" && todo.dataset.status === "active") {
      todo.style.display = "flex"; // '진행중' 상태의 할 일만 표시
    } else if (status === "completed" && todo.dataset.status === "completed") {
      todo.style.display = "flex"; // '완료됨' 상태의 할 일만 표시
    } else {
      todo.style.display = "none"; // 조건에 맞지 않는 항목은 숨김
    }
  });
}

// 할 일 통계를 업데이트하는 함수
function updateStats() {
  const totalCount = document.querySelectorAll("#todo-list li").length; // 전체 할 일 개수 가져오기
  const completedCount = document.querySelectorAll(
    "#todo-list li.completed"
  ).length; // 완료된 할 일 개수 가져오기
  const activeCount = totalCount - completedCount; // 진행 중인 할 일 개수 계산

  // 통계 요소에 값 반영
  document.getElementById("total-count").textContent = totalCount;
  document.getElementById("completed-count").textContent = completedCount;
  document.getElementById("active-count").textContent = activeCount;
}

// 입력 글자 수를 업데이트하는 함수
function updateCharCount() {
  const input = document.getElementById("todo-input"); // 입력 필드 가져오기
  const charCount = document.getElementById("char-count"); // 글자 수 표시 요소 가져오기
  charCount.textContent = `${input.value.length} / 50`; // 현재 입력된 글자 수 표시
}

// 추가 버튼 클릭 시 할 일 추가 함수 실행
document.getElementById("add-button").addEventListener("click", addTodo);

// 엔터 키 입력 시 할 일 추가 기능 실행
document
  .getElementById("todo-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTodo();
    }
  });
