import { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import FilterButtons from "./components/FilterButtons";
import styles from "./styles/App.module.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const totalCount = todos.length;
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = totalCount - activeCount;

  // 📝 할 일 추가
  const addTodo = (task) => {
    const newTodo = { id: Date.now(), text: task, completed: false };
    setTodos([...todos, newTodo]);
  };

  // ✅ 완료 상태 토글
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // ❌ 할 일 삭제
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // ✏️ 할 일 수정
  const updateTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  // 🔍 필터링된 할 일 목록 반환
  const filterTodos = () => {
    if (filter === "all") return todos;
    return todos.filter((todo) =>
      filter === "completed" ? todo.completed : !todo.completed
    );
  };

  return (
    <div className={styles.container}>
      <h1>TODO LIST </h1>

      {/* 📊 통계 정보 */}
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

      {/* 할 일 입력 */}
      <TodoInput onAddTask={addTodo} />

      {/* 필터 버튼 */}
      <FilterButtons setFilter={setFilter} />

      {/* 필터링된 할 일 목록 */}
      <TodoList
        todos={filterTodos()}
        onToggle={toggleComplete}
        onDelete={deleteTodo}
        onUpdate={updateTodo} // ✏️ 수정 기능 추가
      />
    </div>
  );
};

export default App;
