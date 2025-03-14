// useState 훅을 가져와 상태 관리를 가능하게 함
import { useState } from "react";

// 스타일 모듈을 가져와 CSS 적용
import styles from "../styles/TodoInput.module.css";

// TodoInput 컴포넌트 정의
// onAddTask: 새로운 할 일을 추가하는 함수 (부모 컴포넌트에서 전달)
const TodoInput = ({ onAddTask }) => {
  // 입력 필드의 상태를 관리하는 state
  const [task, setTask] = useState("");

  // 할 일을 추가하는 함수
  const handleAddTask = () => {
    if (!task.trim()) return; // 입력값이 공백일 경우 추가하지 않음
    onAddTask(task); // 부모 컴포넌트로 입력된 할 일 전달
    setTask(""); // 입력 필드 초기화
  };

  // Enter 키 입력 시 할 일을 추가하는 함수
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    // 입력 필드와 추가 버튼을 감싸는 컨테이너
    <div className={styles.inputContainer}>
      {/* 할 일 입력 필드 */}
      <input
        type="text"
        placeholder="할 일을 입력하세요" // 입력 안내 문구
        value={task} // 입력된 값을 state와 연결
        onChange={(e) => setTask(e.target.value)} // 입력 시 상태 업데이트
        onKeyPress={handleKeyPress} // Enter 키 입력 시 할 일 추가
        className={styles.input} // 스타일 적용
      />
      {/* 할 일 추가 버튼 */}
      <button className={styles.addButton} onClick={handleAddTask}>
        +
      </button>
    </div>
  );
};

// TodoInput 컴포넌트를 외부에서 사용할 수 있도록 내보내기
export default TodoInput;
