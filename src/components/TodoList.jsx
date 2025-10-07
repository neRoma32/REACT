import AddTodoForm from "./AddTodoForm";
import TodoItem from "./TodoItem";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import { useTodos } from "../hooks/useTodos";

function TodoList() {
  const {
    todos,
    isLoading,
    error,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodoTitle,
    searchTerm,
    setSearchTerm,
    currentPage,
    goToNextPage,
    goToPrevPage,
    totalTodos,
    limitPerPage,
  } = useTodos();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <div className="search-bar">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            task={todo}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
            onEdit={editTodoTitle}
          />
        ))}
      </ul>
      <div className="pagination">
        <Pagination
          currentPage={currentPage}
          totalTodos={totalTodos}
          limit={limitPerPage}
          onNext={goToNextPage}
          onPrev={goToPrevPage}
        />
      </div>
    </div>
  );
}

export default TodoList;
