// 새로운 할 일을 추가하는 함수
function addTodo() {
  const input = document.getElementById("todo-input"); // 입력 필드 가져오기
  const list = document.getElementById("todo-list"); // 할 일 목록 가져오기
  if (input.value.trim() === "") return; // 입력값이 없으면 추가하지 않음

  const li = document.createElement("li"); // 새로운 리스트 아이템(li) 생성
  li.dataset.status = "active"; // 기본 상태를 '진행중'으로 설정

  // 체크박스 생성 (완료 여부 체크)
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("todo-checkbox");
  checkbox.onclick = function () {
    toggleComplete(li, span); // 체크박스 클릭 시 완료 상태 변경
  };

  // 할 일 텍스트를 담을 컨테이너 생성
  const textContainer = document.createElement("div");
  textContainer.classList.add("text-container");

  // 할 일 텍스트(span) 생성 및 편집 가능하게 설정
  const span = document.createElement("span");
  span.textContent = input.value;
  span.setAttribute("contenteditable", "true"); // 텍스트를 클릭하면 수정 가능하도록 설정

  // 텍스트 컨테이너에 체크박스와 텍스트 추가
  textContainer.appendChild(checkbox);
  textContainer.appendChild(span);

  // 수정 및 삭제 버튼을 담을 컨테이너 생성
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  // 수정 버튼 생성
  const editButton = document.createElement("button");
  editButton.classList.add("edit");
  editButton.textContent = "수정";
  editButton.onclick = function () {
    span.focus(); // 버튼 클릭 시 텍스트에 포커스 주기 (수정 가능하게)
  };

  // 삭제 버튼 생성
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "삭제";
  deleteButton.onclick = function () {
    li.remove(); // 할 일을 목록에서 삭제
    updateStats(); // 통계 정보 업데이트
  };

  // 버튼 컨테이너에 수정 및 삭제 버튼 추가
  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);

  // 리스트 아이템에 텍스트 컨테이너와 버튼 컨테이너 추가
  li.appendChild(textContainer);
  li.appendChild(buttonContainer);
  list.appendChild(li); // 할 일 목록에 추가

  input.value = ""; // 입력 필드 초기화
  updateCharCount(); // 문자 개수 업데이트
  updateStats(); // 통계 정보 업데이트
}

// 할 일 완료 상태 변경 함수
function toggleComplete(li, span) {
  li.classList.toggle("completed"); // 리스트 아이템의 'completed' 클래스 토글
  span.classList.toggle("completed-text"); // 텍스트 스타일 변경

  // 데이터 속성 업데이트 (완료 또는 진행중)
  li.dataset.status = li.classList.contains("completed")
    ? "completed"
    : "active";

  updateStats(); // 통계 정보 업데이트
}

// 필터 기능 (전체, 진행중, 완료)
function filterTodos(status) {
  const todos = document.querySelectorAll("#todo-list li"); // 모든 할 일 가져오기

  todos.forEach((todo) => {
    if (status === "all") {
      todo.style.display = "flex"; // 전체 보기
    } else if (status === "active" && todo.dataset.status === "active") {
      todo.style.display = "flex"; // 진행중인 할 일만 보기
    } else if (status === "completed" && todo.dataset.status === "completed") {
      todo.style.display = "flex"; // 완료된 할 일만 보기
    } else {
      todo.style.display = "none"; // 조건에 맞지 않는 항목 숨기기
    }
  });
}

// 통계 정보 업데이트 함수
function updateStats() {
  const totalCount = document.querySelectorAll("#todo-list li").length; // 전체 할 일 개수
  const completedCount = document.querySelectorAll("#todo-list li.completed").length; // 완료된 할 일 개수
  const activeCount = totalCount - completedCount; // 진행중인 할 일 개수

  document.getElementById("total-count").textContent = totalCount;
  document.getElementById("completed-count").textContent = completedCount;
  document.getElementById("active-count").textContent = activeCount;
}

// 입력 필드의 문자 개수 업데이트 함수
function updateCharCount() {
  const input = document.getElementById("todo-input");
  const charCount = document.getElementById("char-count");
  charCount.textContent = `${input.value.length} / 50`; // 현재 입력된 문자 수 표시
}

// 추가 버튼 클릭 시 새로운 할 일 추가
document.getElementById("add-button").addEventListener("click", addTodo);

// Enter 키 입력 시 새로운 할 일 추가
document.getElementById("todo-input").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});
