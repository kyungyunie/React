function addTodo() {
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");
  if (input.value.trim() === "") return;

  const li = document.createElement("li");
  li.dataset.status = "active"; // 기본 상태는 진행중

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("todo-checkbox");
  checkbox.onclick = function () {
    toggleComplete(li, span);
  };

  const textContainer = document.createElement("div");
  textContainer.classList.add("text-container");

  const span = document.createElement("span");
  span.textContent = input.value;
  span.setAttribute("contenteditable", "true");

  textContainer.appendChild(checkbox);
  textContainer.appendChild(span);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const editButton = document.createElement("button");
  editButton.classList.add("edit");
  editButton.textContent = "수정";
  editButton.onclick = function () {
    span.focus();
  };

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "삭제";
  deleteButton.onclick = function () {
    li.remove();
    updateStats();
  };

  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);

  li.appendChild(textContainer);
  li.appendChild(buttonContainer);
  list.appendChild(li);
  input.value = "";
  updateCharCount();
  updateStats();
}

function toggleComplete(li, span) {
  li.classList.toggle("completed");
  span.classList.toggle("completed-text");

  li.dataset.status = li.classList.contains("completed")
    ? "completed"
    : "active";
  updateStats();
}

// ✅ 필터 기능 정상 작동하도록 수정
function filterTodos(status) {
  const todos = document.querySelectorAll("#todo-list li");

  todos.forEach((todo) => {
    if (status === "all") {
      todo.style.display = "flex"; // 전체 보기
    } else if (status === "active" && todo.dataset.status === "active") {
      todo.style.display = "flex"; // 진행중인 할 일
    } else if (status === "completed" && todo.dataset.status === "completed") {
      todo.style.display = "flex"; // 완료된 할 일
    } else {
      todo.style.display = "none"; // 조건에 맞지 않는 항목 숨기기
    }
  });
}

function updateStats() {
  const totalCount = document.querySelectorAll("#todo-list li").length;
  const completedCount = document.querySelectorAll(
    "#todo-list li.completed"
  ).length;
  const activeCount = totalCount - completedCount;

  document.getElementById("total-count").textContent = totalCount;
  document.getElementById("completed-count").textContent = completedCount;
  document.getElementById("active-count").textContent = activeCount;
}

function updateCharCount() {
  const input = document.getElementById("todo-input");
  const charCount = document.getElementById("char-count");
  charCount.textContent = `${input.value.length} / 50`;
}

document.getElementById("add-button").addEventListener("click", addTodo);
document
  .getElementById("todo-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTodo();
    }
  });
