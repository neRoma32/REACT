import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://dummyjson.com/todos";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      setIsLoading(true);
      const res = await axios.get(API_URL);
      setTodos(res.data.todos || []);
    } catch (err) {
      setError(err.message || "Fetch error");
    } finally {
      setIsLoading(false);
    }
  }

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
        todo: res.data?.todo ?? res.data?.text ?? text,
        completed: typeof res.data?.completed === "boolean" ? res.data.completed : false,
      };

      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
   
      setError(err.message || "Add error");
    }
  }

  async function deleteTodo(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);

      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
   
      if (err?.response?.status === 404) {
    
        setTodos((prev) => prev.filter((t) => t.id !== id));
        console.warn(`Todo ${id} not found on server -> removed locally`);
      } else {
        setError(err.message || "Delete error");
      }
    }
  }

  async function toggleTodo(id) {
    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      const updated = { completed: !todo.completed };

      await axios.put(`${API_URL}/${id}`, updated);
      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
    } catch (err) {
      if (err?.response?.status === 404) {
        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
        console.warn(`Todo ${id} not found on server -> toggled locally`);
      } else {
        setError(err.message || "Toggle error");
      }
    }
  }

  return { todos, isLoading, error, addTodo, deleteTodo, toggleTodo };
}
