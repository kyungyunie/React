import { useState } from "react"; // useState 훅을 가져와 상태 관리
import styles from "../styles/TodoItem.module.css"; // CSS 모듈을 가져와 스타일 적용

// 개별 할 일 항목을 관리하는 컴포넌트 정의
const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부를 관리하는 상태
  const [newText, setNewText] = useState(todo.text); // 수정 중인 할 일의 내용을 저장하는 상태

  // 수정 버튼 클릭 시 편집 모드로 변경하는 함수
  const handleEdit = () => {
    setIsEditing(true);
  };

  // 수정 내용을 저장하는 함수
  const handleSave = () => {
    if (!newText.trim()) return; // 빈 문자열이면 저장하지 않음
    onUpdate(todo.id, newText); // 부모 컴포넌트에 수정된 내용 전달
    setIsEditing(false); // 수정 모드 종료
  };

  return (
    <li
      className={`${styles.todoItem} ${todo.completed ? styles.completed : ""}`}
    >
      <div className={styles.todoContent}>
        {/* 체크박스: 완료 상태 변경 */}
        <input
          type="checkbox"
          checked={todo.completed} // 완료 여부에 따라 체크 상태 변경
          onChange={() => onToggle(todo.id)} // 체크 시 완료 상태 토글
          className={styles.checkbox} // 스타일 적용
        />

        {/* 수정 모드일 때와 아닐 때의 UI 구분 */}
        {isEditing ? (
          <input
            type="text"
            value={newText} // 수정 중인 내용 바인딩
            onChange={(e) => setNewText(e.target.value)} // 입력값 변경 시 상태 업데이트
            onBlur={handleSave} // 포커스가 해제되면 저장
            onKeyPress={(e) => e.key === "Enter" && handleSave()} // Enter 키 입력 시 저장
            className={styles.editInput} // 스타일 적용
            autoFocus // 자동 포커스 설정
          />
        ) : (
          <span className={styles.todoText}>{todo.text}</span> // 일반 모드일 때 할 일 텍스트 표시
        )}
      </div>

      <div className={styles.buttonContainer}>
        {/* 수정 중이면 취소 버튼, 아니면 수정 버튼 표시 */}
        {isEditing ? (
          <button
            className={styles.cancelButton}
            onClick={() => setIsEditing(false)} // 취소 버튼 클릭 시 수정 모드 해제
          >
            취소
          </button>
        ) : (
          <button className={styles.editButton} onClick={handleEdit}>
            수정
          </button>
        )}

        {/* 삭제 버튼: 해당 할 일을 삭제하는 기능 */}
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(todo.id)}
        >
          삭제
        </button>
      </div>
    </li>
  );
};

export default TodoItem; // TodoItem 컴포넌트 내보내기
