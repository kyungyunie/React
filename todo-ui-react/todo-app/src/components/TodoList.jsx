import TodoItem from "./TodoItem"; // 개별 할 일 항목을 관리하는 컴포넌트 가져오기
import styles from "../styles/TodoList.module.css"; // CSS 모듈을 가져와 스타일 적용

// 할 일 목록을 표시하는 컴포넌트
const TodoList = ({ todos, onToggle, onDelete, onUpdate }) => {
  return (
    // 할 일 목록을 감싸는 ul 요소
    <ul className={styles.todoList}>
      {/* todos 배열을 순회하며 각 할 일 항목을 TodoItem 컴포넌트로 렌더링 */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id} // 각 항목에 고유한 키 할당 (React에서 리스트 렌더링 시 필요)
          todo={todo} // 개별 할 일 데이터 전달
          onToggle={onToggle} // 완료 상태 변경 함수 전달
          onDelete={onDelete} // 삭제 함수 전달
          onUpdate={onUpdate} // 수정 함수 전달
        />
      ))}
    </ul>
  );
};

export default TodoList; // TodoList 컴포넌트 내보내기
