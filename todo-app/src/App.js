import useTodos from "./hooks/useTodos"; // Custom Hook 가져오기
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import FilterButtons from "./components/FilterButtons";
import styles from "./styles/App.module.css";

// 메인 애플리케이션 컴포넌트
const App = () => {
  // useTodos를 사용하여 상태 및 기능을 가져옴
  const {
    todos,
    addTodo,
    toggleComplete,
    deleteTodo,
    updateTodo,
    filterTodos,
    filter,
    setFilter,
  } = useTodos();

  // 전체 할 일 개수 계산
  const totalCount = todos.length;
  // 진행 중인 (완료되지 않은) 할 일 개수 계산
  const activeCount = todos.filter((todo) => !todo.completed).length;
  // 완료된 할 일 개수 계산 (전체 - 진행 중)
  const completedCount = totalCount - activeCount;

  return (
    <div className={styles.container}>
      <h1>TODO LIST </h1>

      {/* 📌 전체, 진행 중, 완료된 할 일 개수 표시 */}
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

      {/* 필터 버튼 (전체, 진행 중, 완료) */}
      <FilterButtons setFilter={setFilter} />

      {/* 필터링된 할 일 목록을 TodoList 컴포넌트에 전달 */}
      <TodoList
        todos={filterTodos()} // 필터링된 할 일 목록
        onToggle={toggleComplete} // 완료 상태 변경
        onDelete={deleteTodo} // 할 일 삭제
        onUpdate={updateTodo} // 할 일 수정
      />
    </div>
  );
};

export default App;
