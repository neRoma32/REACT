import { useState } from "react";

function AddTodoForm({ onAddTodo }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTodo(task);
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Введи завдання..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Додати</button>
    </form>
  );
}

export default AddTodoForm;
