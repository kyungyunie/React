import { useState } from "react";
import styles from "../styles/TodoInput.module.css";

const TodoInput = ({ onAddTask }) => {
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    if (!task.trim()) return;
    onAddTask(task);
    setTask("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyPress={handleKeyPress}
        className={styles.input}
      />
      <button className={styles.addButton} onClick={handleAddTask}>
        +
      </button>
    </div>
  );
};

export default TodoInput;
