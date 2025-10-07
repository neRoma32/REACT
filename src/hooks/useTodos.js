import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = "https://dummyjson.com/todos";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [totalTodos, setTotalTodos] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const fetchTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      const skip = (currentPage - 1) * limitPerPage;
      const res = await axios.get(`${API_URL}?limit=${limitPerPage}&skip=${skip}`);

      setTodos(res.data.todos || []);
      setTotalTodos(res.data.total || 0);
    } catch (err) {
      setError(err.message || "Fetch error");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, limitPerPage]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  async function addTodo(text) {
    if (!text || !text.trim()) return;
    try {
      const res = await axios.post(`${API_URL}/add`, {
        todo: text,
        completed: false,
        userId: 1,
      });

      const newTodo = {
        ...res.data,
        id: res.data?.id ?? Date.now(),
        todo: res.data?.todo ?? text,
        completed: res.data?.completed ?? false,
        isLocal: true,
      };

      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      setError(err.message || "Add error");
    }
  }

  async function deleteTodo(id) {
    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      if (todo.isLocal || id > 200) {
        setTodos((prev) => prev.filter((t) => t.id !== id));
        return;
      }

      await axios.delete(`${API_URL}/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message || "Delete error");
    }
  }

  async function toggleTodo(id) {
    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      const updated = { completed: !todo.completed };

      if (todo.isLocal || id > 200) {
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
        );
        return;
      }

      await axios.put(`${API_URL}/${id}`, updated);
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
      );
    } catch (err) {
      setError(err.message || "Toggle error");
    }
  }

  async function editTodoTitle(id, newTitle) {
    if (!newTitle.trim()) return;
    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      if (todo.isLocal || id > 200) {
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, todo: newTitle.trim() } : t))
        );
        return;
      }

      const res = await axios.put(`${API_URL}/${id}`, { todo: newTitle });
      const updated = res.data;

      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, todo: updated.todo } : t))
      );
    } catch (err) {
      setError(err.message || "Edit error");
    }
  }

  const filteredTodos = todos.filter((t) =>
    t.todo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const goToNextPage = () =>
    setCurrentPage((prev) =>
      prev < Math.ceil(totalTodos / limitPerPage) ? prev + 1 : prev
    );

  const goToPrevPage = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));

  return {
    todos: filteredTodos,
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
    setLimitPerPage,
  };
}
