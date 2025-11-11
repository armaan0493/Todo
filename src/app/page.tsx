"use client";

import { useEffect, useState } from "react";
import TodoList, { Todo } from "./components/TodoList";

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/todos");
      const result = await response.json();
      
      if (result.success) {
        setTodos(result.data);
      } else {
        setError(result.error || "Failed to fetch todos");
      }
    } catch (err) {
      setError("Failed to fetch todos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add new todo
  const addTodo = async () => {
    if (!newTodo.trim()) {
      setError("Please enter a todo");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTodo }),
      });

      const result = await response.json();

      if (result.success) {
        setNewTodo("");
        setError("");
        fetchTodos();
      } else {
        setError(result.error || "Failed to add todo");
      }
    } catch (err) {
      setError("Failed to add todo");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentStatus }),
      });

      const result = await response.json();

      if (result.success) {
        fetchTodos();
      } else {
        setError(result.error || "Failed to update todo");
      }
    } catch (err) {
      setError("Failed to update todo");
      console.error(err);
    }
  };

  // Delete todo
  const deleteTodo = async (id: string) => {
    if (!confirm("Are you sure you want to delete this todo?")) {
      return;
    }

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        fetchTodos();
      } else {
        setError(result.error || "Failed to delete todo");
      }
    } catch (err) {
      setError("Failed to delete todo");
      console.error(err);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        📝 Full Stack Todo App
      </h1>

      {/* Add Todo Input */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "2rem",
        }}
      >
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What needs to be done?"
          style={{
            flex: 1,
            padding: "0.75rem",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "1rem",
          }}
          disabled={loading}
        />
        <button
          onClick={addTodo}
          disabled={loading}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "1rem",
          }}
        >
          {loading ? "..." : "Add"}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div
          style={{
            padding: "0.75rem",
            marginBottom: "1rem",
            backgroundColor: "#fee",
            color: "#c00",
            borderRadius: "8px",
          }}
        >
          {error}
        </div>
      )}

      {/* Todo List */}
      {loading && todos.length === 0 ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      )}

      {/* Stats */}
      <div
        style={{
          marginTop: "2rem",
          textAlign: "center",
          color: "#666",
        }}
      >
        <p>
          {todos.filter((t) => !t.completed).length} of {todos.length} remaining
        </p>
      </div>
    </main>
  );
}