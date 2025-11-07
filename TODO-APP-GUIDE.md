# 📝 Full Stack TODO Application - Complete Guide

## 🎯 Overview
A modern full-stack TODO application built with Next.js 14+ App Router, TypeScript, and MongoDB following industry best practices and clean architecture principles.

---

## 📚 Table of Contents
1. [Tech Stack](#-tech-stack)
2. [Architecture Overview](#-architecture-overview)
3. [Project Roadmap](#-project-roadmap)
4. [Folder Structure](#-folder-structure)
5. [Step-by-Step Implementation](#-step-by-step-implementation)
6. [Best Practices](#-best-practices)
7. [Testing & Deployment](#-testing--deployment)

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 14+ (App Router) | React framework with server components |
| **Language** | TypeScript | Type safety and better DX |
| **Backend** | Next.js API Routes | RESTful API endpoints |
| **Database** | MongoDB | NoSQL document database |
| **ODM** | Mongoose | Schema-based MongoDB modeling |
| **Styling** | CSS/Tailwind | UI styling (optional) |

---

## 🏗 Architecture Overview

### **3-Tier Architecture**
```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (React Components, UI, User Interface) │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         Application Layer               │
│    (API Routes, Business Logic)         │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│          Data Layer                     │
│  (Models, Database Connection, Schema)  │
└─────────────────────────────────────────┘
```

### **Design Patterns Used**
- **MVC Pattern**: Separation of concerns (Model-View-Controller)
- **Repository Pattern**: Database abstraction through Mongoose models
- **Singleton Pattern**: Single MongoDB connection instance
- **RESTful API**: Standard HTTP methods for CRUD operations

---

## 🗺 Project Roadmap

### **Phase 1: Setup & Configuration** ⏱ 15-20 mins
- [ ] Initialize Next.js project with TypeScript
- [ ] Install dependencies (Mongoose)
- [ ] Configure environment variables
- [ ] Setup MongoDB Atlas account (if needed)

### **Phase 2: Database Layer** ⏱ 10-15 mins
- [ ] Create MongoDB connection helper
- [ ] Define Todo schema/model
- [ ] Test database connection

### **Phase 3: Backend API Layer** ⏱ 20-30 mins
- [ ] Create API route structure
- [ ] Implement GET (Read all todos)
- [ ] Implement POST (Create todo)
- [ ] Implement PUT (Update todo)
- [ ] Implement DELETE (Delete todo)
- [ ] Add error handling

### **Phase 4: Frontend Layer** ⏱ 30-45 mins
- [ ] Create main page component
- [ ] Build reusable TodoList component
- [ ] Implement state management
- [ ] Connect frontend to API
- [ ] Add loading states

### **Phase 5: Enhancement & Polish** ⏱ 20-30 mins
- [ ] Add input validation
- [ ] Improve UI/UX
- [ ] Add error messages
- [ ] Implement optimistic updates
- [ ] Add loading indicators

### **Phase 6: Testing & Deployment** ⏱ 20-30 mins
- [ ] Test all CRUD operations
- [ ] Deploy to Vercel
- [ ] Configure production environment variables

**Total Estimated Time**: 2-3 hours

---

## 📁 Folder Structure

```
todo-app/
├── app/
│   ├── api/                          # API routes directory
│   │   └── todos/
│   │       ├── route.ts             # GET (all), POST (create)
│   │       └── [id]/
│   │           └── route.ts         # PUT (update), DELETE (delete)
│   │
│   ├── components/                   # Reusable React components
│   │   └── TodoList.tsx             # Todo list component
│   │
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout (wrapper)
│   └── page.tsx                      # Home page (main UI)
│
├── lib/                              # Utilities and helpers
│   └── mongodb.ts                    # MongoDB connection helper
│
├── models/                           # Database models (schemas)
│   └── Todo.ts                       # Todo Mongoose model
│
├── types/                            # TypeScript type definitions (optional)
│   └── todo.types.ts                # Shared types
│
├── .env.local                        # Environment variables (NOT in git)
├── .gitignore                        # Git ignore file
├── next.config.mjs                   # Next.js configuration
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # Project documentation
```

---

## 🚀 Step-by-Step Implementation

### **Step 1: Project Initialization**

#### 1.1 Create Next.js Project
```bash
npx create-next-app@latest todo-app --typescript --app --eslint
cd todo-app
```

#### 1.2 Install Dependencies
```bash
npm install mongoose
```

#### 1.3 Create Required Directories
```bash
mkdir -p lib models app/components app/api/todos/[id]
```

---

### **Step 2: Database Connection Layer**

#### 2.1 Create `lib/mongodb.ts`
```typescript
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB connected successfully");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
```

**Best Practices Applied:**
- ✅ Singleton pattern for connection caching
- ✅ Prevents connection pool exhaustion in development
- ✅ Error handling
- ✅ Environment variable validation

---

### **Step 3: Data Model Layer**

#### 3.1 Create `models/Todo.ts`
```typescript
import mongoose, { Schema, model, models } from "mongoose";

export interface ITodo {
  title: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const TodoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: [true, "Please provide a todo title"],
      trim: true,
      maxlength: [200, "Title cannot be more than 200 characters"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Prevent model overwrite upon initial compile
const Todo = models.Todo || model<ITodo>("Todo", TodoSchema);

export default Todo;
```

**Best Practices Applied:**
- ✅ TypeScript interface for type safety
- ✅ Schema validation (required, maxlength)
- ✅ Automatic timestamps
- ✅ Model caching to prevent recompilation errors

---

### **Step 4: API Routes Layer**

#### 4.1 Create `app/api/todos/route.ts`
```typescript
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Todo from "@/models/Todo";

/**
 * GET /api/todos
 * Retrieves all todos from the database
 */
export async function GET() {
  try {
    await connectToDatabase();
    const todos = await Todo.find().sort({ createdAt: -1 }); // Latest first
    
    return NextResponse.json({
      success: true,
      data: todos,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch todos",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/todos
 * Creates a new todo
 */
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    // Validate input
    if (!body.title || body.title.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          error: "Title is required",
        },
        { status: 400 }
      );
    }
    
    const newTodo = await Todo.create({
      title: body.title.trim(),
      completed: body.completed || false,
    });
    
    return NextResponse.json(
      {
        success: true,
        data: newTodo,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create todo",
      },
      { status: 500 }
    );
  }
}
```

#### 4.2 Create `app/api/todos/[id]/route.ts`
```typescript
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Todo from "@/models/Todo";
import mongoose from "mongoose";

/**
 * GET /api/todos/:id
 * Retrieves a single todo by ID
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid todo ID",
        },
        { status: 400 }
      );
    }
    
    const todo = await Todo.findById(params.id);
    
    if (!todo) {
      return NextResponse.json(
        {
          success: false,
          error: "Todo not found",
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: todo,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch todo",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/todos/:id
 * Updates a todo by ID
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid todo ID",
        },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    const updatedTodo = await Todo.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    );
    
    if (!updatedTodo) {
      return NextResponse.json(
        {
          success: false,
          error: "Todo not found",
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: updatedTodo,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to update todo",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/todos/:id
 * Deletes a todo by ID
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid todo ID",
        },
        { status: 400 }
      );
    }
    
    const deletedTodo = await Todo.findByIdAndDelete(params.id);
    
    if (!deletedTodo) {
      return NextResponse.json(
        {
          success: false,
          error: "Todo not found",
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to delete todo",
      },
      { status: 500 }
    );
  }
}
```

**Best Practices Applied:**
- ✅ Consistent error handling
- ✅ Input validation
- ✅ MongoDB ObjectId validation
- ✅ Proper HTTP status codes
- ✅ Standardized response format
- ✅ JSDoc comments for documentation

---

### **Step 5: Frontend Components**

#### 5.1 Create `app/components/TodoList.tsx`
```typescript
import React from "react";

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
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
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
          <span
            style={{
              flex: 1,
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "#999" : "#333",
            }}
          >
            {todo.title}
          </span>
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
```

#### 5.2 Create `app/page.tsx`
```typescript
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
```

**Best Practices Applied:**
- ✅ Loading states
- ✅ Error handling
- ✅ User feedback (alerts, confirmations)
- ✅ Keyboard support (Enter key)
- ✅ TypeScript interfaces
- ✅ Clean, maintainable code

---

### **Step 6: Environment Configuration**

#### 6.1 Create `.env.local`
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/todos?retryWrites=true&w=majority
```

#### 6.2 Update `.gitignore`
Ensure `.env.local` is in `.gitignore`:
```
.env.local
.env
```

---

## 🎯 Best Practices

### **1. Code Organization**
- ✅ Separate concerns (models, routes, components)
- ✅ Keep components small and focused
- ✅ Use meaningful file and variable names
- ✅ Follow consistent naming conventions

### **2. Security**
- ✅ Never commit `.env.local` to Git
- ✅ Validate all user inputs
- ✅ Sanitize data before database operations
- ✅ Use environment variables for sensitive data

### **3. TypeScript**
- ✅ Define interfaces for all data structures
- ✅ Use proper types instead of `any`
- ✅ Enable strict mode in `tsconfig.json`
- ✅ Export types for reusability

### **4. Error Handling**
- ✅ Always use try-catch blocks
- ✅ Provide meaningful error messages
- ✅ Log errors for debugging
- ✅ Return proper HTTP status codes

### **5. Database**
- ✅ Use connection caching
- ✅ Add schema validation
- ✅ Index frequently queried fields
- ✅ Use transactions for complex operations

### **6. Performance**
- ✅ Implement loading states
- ✅ Use optimistic UI updates
- ✅ Debounce API calls
- ✅ Implement pagination for large datasets

### **7. User Experience**
- ✅ Show loading indicators
- ✅ Display error messages clearly
- ✅ Confirm destructive actions
- ✅ Support keyboard shortcuts

---

## 🧪 Testing & Deployment

### **Testing Checklist**
- [ ] Create a new todo
- [ ] Mark todo as completed
- [ ] Unmark todo
- [ ] Delete todo
- [ ] Test with empty input
- [ ] Test with very long input
- [ ] Test with multiple todos
- [ ] Test error scenarios (disconnect database)

### **Deploy to Vercel**

#### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

#### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variable: `MONGODB_URI`
4. Deploy

#### 3. MongoDB Atlas Setup
1. Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a cluster
3. Create database user
4. Whitelist Vercel IPs (or use `0.0.0.0/0` for all IPs)
5. Get connection string
6. Add to Vercel environment variables

---

## 🚀 Running the Application

### **Development**
```bash
npm run dev
```
Visit: `http://localhost:3000`

### **Production Build**
```bash
npm run build
npm start
```

---

## 📈 Future Enhancements

### **Phase 7: Advanced Features**
- [ ] User authentication (NextAuth.js)
- [ ] Todo categories/tags
- [ ] Due dates and reminders
- [ ] Search and filter
- [ ] Drag-and-drop reordering
- [ ] Dark mode
- [ ] Export todos (CSV/JSON)

### **Phase 8: Performance & Scalability**
- [ ] Implement pagination
- [ ] Add caching (Redis)
- [ ] Optimize database queries
- [ ] Add API rate limiting
- [ ] Implement WebSockets for real-time updates

---

## 📝 Summary

This guide provides a complete roadmap for building a production-ready TODO application following industry best practices:

✅ **Clean Architecture**: Separation of concerns with proper layering  
✅ **Type Safety**: Full TypeScript implementation  
✅ **Error Handling**: Comprehensive error management  
✅ **Validation**: Input validation at all layers  
✅ **Performance**: Connection caching and optimized queries  
✅ **Security**: Environment variables and input sanitization  
✅ **User Experience**: Loading states, error messages, confirmations  
✅ **Scalability**: Ready for future enhancements  

**Next Steps**: Follow the roadmap phase by phase, implement each code snippet, and test thoroughly before moving to the next phase.

---

**Happy Coding! 🚀**
