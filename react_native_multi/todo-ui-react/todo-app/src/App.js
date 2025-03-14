// useState 훅을 가져와 상태 관리를 가능하게 함
import { useState } from "react";

// 할 일 입력, 목록, 필터 버튼 컴포넌트 가져오기
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import FilterButtons from "./components/FilterButtons";

// 스타일 모듈 가져오기
import styles from "./styles/App.module.css";

// App 컴포넌트 정의
const App = () => {
  // 할 일 목록을 관리하는 상태
  const [todos, setTodos] = useState([]);
  // 필터링 상태를 관리하는 상태 (all, active, completed)
  const [filter, setFilter] = useState("all");

  // 전체 할 일 개수 계산
  const totalCount = todos.length;
  // 진행 중인 할 일 개수 계산
  const activeCount = todos.filter((todo) => !todo.completed).length;
  // 완료된 할 일 개수 계산
  const completedCount = totalCount - activeCount;

  // 할 일을 추가하는 함수
  const addTodo = (task) => {
    const newTodo = { id: Date.now(), text: task, completed: false }; // 새로운 할 일 객체 생성
    setTodos([...todos, newTodo]); // 기존 목록에 새로운 할 일 추가
  };

  // 완료 상태를 토글하는 함수
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 할 일을 삭제하는 함수
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id)); // 해당 ID를 가진 할 일을 목록에서 제거
  };

  // 할 일을 수정하는 함수
  const updateTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  // 현재 필터에 따라 할 일을 필터링하는 함수
  const filterTodos = () => {
    if (filter === "all") return todos; // 모든 할 일 반환
    return todos.filter((todo) =>
      filter === "completed" ? todo.completed : !todo.completed
    );
  };

  return (
    // 전체 앱을 감싸는 컨테이너
    <div className={styles.container}>
      <h1>TODO LIST</h1>

      {/* 통계 정보 표시 영역 */}
      <div className={styles.statsContainer}>
        <p>
          📌 전체: <span>{totalCount}</span>
        </p>
        <p>
          ⏳ 진행중: <span>{activeCount}</span>
        </p>
        <p>
          ✅ 완료: <span>{completedCount}</span>
        </p>
      </div>

      {/* 할 일 입력 컴포넌트 */}
      <TodoInput onAddTask={addTodo} />

      {/* 필터 버튼 컴포넌트 */}
      <FilterButtons setFilter={setFilter} />

      {/* 필터링된 할 일 목록 렌더링 */}
      <TodoList
        todos={filterTodos()}
        onToggle={toggleComplete}
        onDelete={deleteTodo}
        onUpdate={updateTodo}
      />
    </div>
  );
};

// App 컴포넌트를 외부에서 사용할 수 있도록 내보내기
export default App;
