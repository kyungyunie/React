import TodoItem from "./TodoItem";
import styles from "../styles/TodoList.module.css";

const TodoList = ({ todos, onToggle, onDelete, onUpdate }) => {
  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
};

export default TodoList;
