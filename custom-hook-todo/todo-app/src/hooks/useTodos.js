import { useState, useEffect } from "react";

// useTodos: 할 일 목록을 관리하는 Custom Hook
const useTodos = () => {
  // 할 일 목록 상태를 useState를 사용하여 관리
  // 로컬 스토리지에 기존 할 일 목록이 저장되어 있다면 불러오고, 없다면 빈 배열을 사용
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // 필터 상태 관리 (all, active, completed 중 하나를 가짐)
  const [filter, setFilter] = useState("all");

  // todos 상태가 변경될 때마다 로컬 스토리지에 저장하여 브라우저 새로고침 후에도 데이터 유지
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 새로운 할 일을 추가하는 함수
  const addTodo = (task) => {
    if (!task.trim()) return; // 빈 입력 방지
    const newTodo = { id: Date.now(), text: task, completed: false };
    setTodos([...todos, newTodo]);
  };

  // 특정 할 일의 완료 상태를 변경하는 함수
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 특정 할 일을 삭제하는 함수
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 특정 할 일의 내용을 수정하는 함수
  const updateTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  // 현재 설정된 필터에 따라 할 일 목록을 필터링하는 함수
  const filterTodos = () => {
    if (filter === "all") return todos;
    return todos.filter((todo) =>
      filter === "completed" ? todo.completed : !todo.completed
    );
  };

  return {
    todos, // 할 일 목록
    addTodo, // 할 일 추가 기능
    toggleComplete, // 완료 상태 변경 기능
    deleteTodo, // 할 일 삭제 기능
    updateTodo, // 할 일 수정 기능
    filterTodos, // 필터링된 할 일 목록 반환
    filter, // 현재 필터 상태
    setFilter, // 필터 상태 변경 함수
  };
};

export default useTodos;
