function TodoItem({ task, onDelete, onToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span className={task.completed ? "completed" : ""}>
        {task.todo || task.text}
      </span>
      <button onClick={() => onDelete(task.id)}>X</button>
    </li>
  );
}

export default TodoItem;
