// TodoItem 컴포넌트를 가져와 개별 할 일을 렌더링하는 데 사용
import TodoItem from "./TodoItem";

// 스타일 모듈을 가져와 CSS 적용
import styles from "../styles/TodoList.module.css";

// TodoList 컴포넌트 정의
// todos: 할 일 목록 배열 (각 항목은 { id, text, completed } 형태의 객체)
// onToggle: 완료 상태 변경 함수
// onDelete: 할 일 삭제 함수
// onUpdate: 할 일 수정 함수
const TodoList = ({ todos, onToggle, onDelete, onUpdate }) => {
  return (
    // 할 일 목록을 감싸는 ul 요소
    <ul className={styles.todoList}>
      {/* 할 일 배열을 순회하며 개별 TodoItem 컴포넌트 렌더링 */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id} // 각 항목에 고유한 키 부여 (리액트 최적화를 위해 필요)
          todo={todo} // 개별 할 일 객체 전달
          onToggle={onToggle} // 완료 상태 변경 함수 전달
          onDelete={onDelete} // 삭제 함수 전달
          onUpdate={onUpdate} // 수정 함수 전달
        />
      ))}
    </ul>
  );
};

// TodoList 컴포넌트를 외부에서 사용할 수 있도록 내보내기
export default TodoList;
