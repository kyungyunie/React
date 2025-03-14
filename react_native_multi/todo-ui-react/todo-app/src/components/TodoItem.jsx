// useState 훅을 가져와 상태 관리를 가능하게 함
import { useState } from "react";

// 스타일 모듈을 가져와 CSS 적용
import styles from "../styles/TodoItem.module.css";

// TodoItem 컴포넌트 정의
// todo: 개별 할 일 객체 (id, text, completed 상태 포함)
// onToggle: 완료 상태 변경 함수
// onDelete: 할 일 삭제 함수
// onUpdate: 할 일 내용 수정 함수
const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  // 수정 모드 여부를 관리하는 상태
  const [isEditing, setIsEditing] = useState(false);
  // 수정 중인 할 일 내용을 저장하는 상태
  const [newText, setNewText] = useState(todo.text);

  // 수정 버튼 클릭 시 편집 모드로 변경하는 함수
  const handleEdit = () => {
    setIsEditing(true);
  };

  // 수정된 내용을 저장하는 함수
  const handleSave = () => {
    if (!newText.trim()) return; // 입력값이 공백이면 저장하지 않음
    onUpdate(todo.id, newText); // 부모 컴포넌트로 수정된 내용 전달
    setIsEditing(false); // 수정 모드 종료
  };

  return (
    // 리스트 아이템 요소 (할 일 하나를 나타냄)
    <li
      className={`${styles.todoItem} ${todo.completed ? styles.completed : ""}`} // 완료된 항목이면 스타일 변경
    >
      {/* 체크박스 및 할 일 내용 영역 */}
      <div className={styles.todoContent}>
        {/* 완료 상태를 토글하는 체크박스 */}
        <input
          type="checkbox"
          checked={todo.completed} // 완료 여부 상태 반영
          onChange={() => onToggle(todo.id)} // 체크박스 클릭 시 완료 상태 변경
          className={styles.checkbox}
        />
        {/* 수정 모드일 때와 아닐 때의 렌더링 분기 */}
        {isEditing ? (
          // 수정 모드: 입력 필드 표시
          <input
            type="text"
            value={newText} // 입력값 상태 반영
            onChange={(e) => setNewText(e.target.value)} // 입력값 변경 시 상태 업데이트
            onBlur={handleSave} // 포커스가 벗어날 때 자동 저장
            onKeyPress={(e) => e.key === "Enter" && handleSave()} // 엔터 키 입력 시 저장
            className={styles.editInput}
            autoFocus // 자동으로 포커스를 설정
          />
        ) : (
          // 기본 모드: 텍스트만 표시
          <span className={styles.todoText}>{todo.text}</span>
        )}
      </div>

      {/* 수정 및 삭제 버튼 영역 */}
      <div className={styles.buttonContainer}>
        {/* 수정 모드일 때 취소 버튼 표시 */}
        {isEditing ? (
          <button
            className={styles.cancelButton}
            onClick={() => setIsEditing(false)} // 취소 버튼 클릭 시 수정 모드 종료
          >
            취소
          </button>
        ) : (
          <button className={styles.editButton} onClick={handleEdit}>
            수정
          </button>
        )}

        {/* 삭제 버튼 */}
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(todo.id)} // 클릭 시 해당 할 일 삭제
        >
          삭제
        </button>
      </div>
    </li>
  );
};

// TodoItem 컴포넌트를 외부에서 사용할 수 있도록 내보내기
export default TodoItem;
