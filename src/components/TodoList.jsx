import { useState } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoItem from "./TodoItem";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (task) => {
    if (!task.trim()) return;
    setTodos([...todos, { id: Date.now(), text: task }]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <AddTodoForm onAddTodo={addTodo} />
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            task={todo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
