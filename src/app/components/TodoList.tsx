import React from "react";
import { useState } from "react";
import { Button } from "next";
export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
const [editValue, setEditValue] = useState("");
  if (todos.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
        <p>📝 No todos yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map((todo) => (
        <li
          key={todo._id}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.75rem",
            marginBottom: "0.5rem",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
          }}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo._id, todo.completed)}
            style={{ marginRight: "0.75rem", cursor: "pointer" }}
          />

{editingId === todo._id ? (
  <div style={{ flex: 1, display: "flex", gap: "0.5rem" }}>
    <input
      type="text"
      value={editValue}
      onChange={(e) => setEditValue(e.target.value)}
      style={{
        flex: 1,
        padding: "0.5rem",
        borderRadius: "6px",
        border: "1px solid #ddd",
        fontSize: "1rem",
      }}
      autoFocus
    />
    <button
      onClick={() => {
        if (editValue.trim()) {
          onEdit(todo._id, editValue.trim());
          setEditingId(null);
        }
      }}
      style={{
        padding: "0.5rem 1rem",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "0.875rem",
      }}
    >
      Save
    </button>
    <button
      onClick={() => setEditingId(null)}
      style={{
        padding: "0.5rem 1rem",
        backgroundColor: "#6c757d",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "0.875rem",
      }}
    >
      Cancel
    </button>
  </div>
) : (
  <span
    style={{
      flex: 1,
      textDecoration: todo.completed ? "line-through" : "none",
      color: todo.completed ? "#999" : "#000",
    }}
  >
    {todo.title}
  </span>
)}

          <button
            onClick={() => onDelete(todo._id)}
            style={{
              padding: "0.25rem 0.5rem",
              backgroundColor: "#ff4444",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
{editingId !== todo._id && (
  <>
    <button onClick={() => { setEditingId(todo._id); setEditValue(todo.title); }} ...>
      Edit
    </button>
    <button onClick={() => onDelete(todo._id)} ...>
      Delete
    </button>
  </>
)}