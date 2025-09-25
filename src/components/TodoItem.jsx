import { useState } from "react";

function TodoItem({ task, onDelete }) {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <li>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => setIsCompleted(!isCompleted)}
      />
      <span className={isCompleted ? "completed" : ""}>
        {task.text}
      </span>
      <button onClick={() => onDelete(task.id)}>X</button>
    </li>
  );
}

export default TodoItem;
