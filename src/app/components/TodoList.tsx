export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div style={{ textAlign: "center", color: "#999", padding: "2rem" }}>
        No todos yet. Add one above! 🎯
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {todos.map((todo) => (
        <div
          key={todo._id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1rem",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            border: "1px solid #eee",
          }}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo._id, todo.completed)}
            style={{ cursor: "pointer", width: "18px", height: "18px" }}
          />
          <span
            style={{
              flex: 1,
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "#999" : "#000",
            }}
          >
            {todo.title}
          </span>
          <button
            onClick={() => onDelete(todo._id)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#ff4444",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
