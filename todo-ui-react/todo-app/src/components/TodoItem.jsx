import { useState } from "react";
import styles from "../styles/TodoItem.module.css";

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!newText.trim()) return;
    onUpdate(todo.id, newText);
    setIsEditing(false);
  };

  return (
    <li
      className={`${styles.todoItem} ${todo.completed ? styles.completed : ""}`}
    >
      <div className={styles.todoContent}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className={styles.checkbox}
        />
        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onBlur={handleSave}
            onKeyPress={(e) => e.key === "Enter" && handleSave()}
            className={styles.editInput}
            autoFocus
          />
        ) : (
          <span className={styles.todoText}>{todo.text}</span>
        )}
      </div>

      <div className={styles.buttonContainer}>
        {isEditing ? (
          <button
            className={styles.cancelButton}
            onClick={() => setIsEditing(false)}
          >
            취소
          </button>
        ) : (
          <button className={styles.editButton} onClick={handleEdit}>
            수정
          </button>
        )}

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

export default TodoItem;
