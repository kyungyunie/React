import { useState } from "react"; // useState 훅을 가져와 상태 관리
import styles from "../styles/TodoInput.module.css"; // CSS 모듈을 가져와 스타일 적용

// 할 일 입력을 위한 컴포넌트 정의
const TodoInput = ({ onAddTask }) => {
  const [task, setTask] = useState(""); // 입력 필드의 상태를 관리하는 state

  // 새로운 할 일을 추가하는 함수
  const handleAddTask = () => {
    if (!task.trim()) return; // 공백만 있는 경우 추가되지 않도록 처리
    onAddTask(task); // 부모 컴포넌트로 입력된 할 일 전달
    setTask(""); // 입력 필드 초기화
  };

  // Enter 키를 눌렀을 때 할 일을 추가하는 함수
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className={styles.inputContainer}>
      {/* 할 일 입력 필드 */}
      <input
        type="text"
        placeholder="할 일을 입력하세요" // 입력 필드의 힌트 텍스트
        value={task} // 입력된 값 바인딩
        onChange={(e) => setTask(e.target.value)} // 입력값 변경 시 상태 업데이트
        onKeyPress={handleKeyPress} // Enter 키 입력 시 할 일 추가
        className={styles.input} // CSS 클래스 적용
      />
      {/* 할 일 추가 버튼 */}
      <button className={styles.addButton} onClick={handleAddTask}>
        +
      </button>
    </div>
  );
};

export default TodoInput; // TodoInput 컴포넌트 내보내기
