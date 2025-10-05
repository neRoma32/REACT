import AddTodoForm from "./AddTodoForm";
import TodoItem from "./TodoItem";
import { useTodos } from "../hooks/useTodos";

function TodoList() {
  const { todos, isLoading, error, addTodo, deleteTodo, toggleTodo } = useTodos();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <AddTodoForm onAddTodo={addTodo} />
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            task={todo}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
