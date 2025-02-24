import { useState } from "react"; // useState 훅을 가져와 상태 관리를 수행
import TodoInput from "./components/TodoInput"; // 할 일 입력 컴포넌트 가져오기
import TodoList from "./components/TodoList"; // 할 일 목록 컴포넌트 가져오기
import FilterButtons from "./components/FilterButtons"; // 필터 버튼 컴포넌트 가져오기
import styles from "./styles/App.module.css"; // CSS 모듈 가져오기

// 메인 애플리케이션 컴포넌트 정의
const App = () => {
  // 할 일 목록 상태 및 필터 상태 관리
  const [todos, setTodos] = useState([]); // 할 일 목록을 저장하는 상태
  const [filter, setFilter] = useState("all"); // 필터 상태 (all, active, completed)

  // 할 일 개수 계산
  const totalCount = todos.length; // 전체 할 일 개수
  const activeCount = todos.filter((todo) => !todo.completed).length; // 진행 중인 할 일 개수
  const completedCount = totalCount - activeCount; // 완료된 할 일 개수

  // 새로운 할 일을 추가하는 함수
  const addTodo = (task) => {
    const newTodo = { id: Date.now(), text: task, completed: false }; // 새로운 할 일 객체 생성
    setTodos([...todos, newTodo]); // 기존 할 일 목록에 새 할 일을 추가
  };

  // 할 일의 완료 상태를 토글하는 함수
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo // 해당 ID의 할 일 완료 상태 변경
      )
    );
  };

  // 특정 할 일을 삭제하는 함수
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id)); // 선택한 ID의 할 일을 제외한 목록으로 갱신
  };

  // 특정 할 일의 내용을 수정하는 함수
  const updateTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)) // 해당 ID의 할 일 텍스트 변경
    );
  };

  // 현재 설정된 필터에 따라 할 일 목록을 반환하는 함수
  const filterTodos = () => {
    if (filter === "all") return todos; // 모든 할 일 반환
    return todos.filter((todo) =>
      filter === "completed" ? todo.completed : !todo.completed // 완료된 할 일 또는 진행 중인 할 일 필터링
    );
  };

  return (
    <div className={styles.container}>
      <h1>TODO LIST </h1>

      {/* 통계 정보 표시 */}
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

      {/* 할 일 입력 필드 */}
      <TodoInput onAddTask={addTodo} />

      {/* 필터 버튼 */}
      <FilterButtons setFilter={setFilter} />

      {/* 필터링된 할 일 목록 */}
      <TodoList
        todos={filterTodos()}
        onToggle={toggleComplete}
        onDelete={deleteTodo}
        onUpdate={updateTodo} // 수정 기능 포함
      />
    </div>
  );
};

export default App; // App 컴포넌트 내보내기
