/**
 * TypeScript Type Definitions Reference
 * Use these types throughout your application for consistency
 */

// ==========================================
// DATABASE MODELS
// ==========================================

/**
 * Todo Interface (Database Model)
 * Represents a todo item in MongoDB
 */
export interface ITodo {
  _id?: string;
  title: string;
  completed: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

/**
 * Todo Creation Input
 * Used when creating a new todo (without _id)
 */
export interface CreateTodoInput {
  title: string;
  completed?: boolean;
}

/**
 * Todo Update Input
 * Used when updating a todo (partial fields)
 */
export interface UpdateTodoInput {
  title?: string;
  completed?: boolean;
}

// ==========================================
// API RESPONSES
// ==========================================

/**
 * Standard API Success Response
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

/**
 * Standard API Error Response
 */
export interface ApiErrorResponse {
  success: false;
  error: string;
}

/**
 * Generic API Response
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// ==========================================
// COMPONENT PROPS
// ==========================================

/**
 * TodoList Component Props
 */
export interface TodoListProps {
  todos: ITodo[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onUpdate?: (id: string, title: string) => void;
}

/**
 * TodoItem Component Props
 */
export interface TodoItemProps {
  todo: ITodo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onUpdate?: (id: string, title: string) => void;
}

/**
 * TodoForm Component Props
 */
export interface TodoFormProps {
  onSubmit: (title: string) => void;
  loading?: boolean;
}

// ==========================================
// STATE MANAGEMENT
// ==========================================

/**
 * Todo App State
 */
export interface TodoState {
  todos: ITodo[];
  loading: boolean;
  error: string | null;
}

/**
 * Filter Options for Todos
 */
export type TodoFilter = 'all' | 'active' | 'completed';

/**
 * Sort Options for Todos
 */
export type TodoSort = 'newest' | 'oldest' | 'title';

// ==========================================
// MONGODB CONNECTION
// ==========================================

/**
 * Mongoose Connection Cache
 */
export interface MongooseCache {
  conn: typeof import('mongoose') | null;
  promise: Promise<typeof import('mongoose')> | null;
}

/**
 * Global Declaration for Mongoose Cache
 */
declare global {
  var mongoose: MongooseCache | undefined;
}

// ==========================================
// UTILITY TYPES
// ==========================================

/**
 * Make all properties optional except specified ones
 */
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

/**
 * API Route Context with Params
 */
export interface RouteContext<T = any> {
  params: T;
}

// ==========================================
// EXAMPLE USAGE
// ==========================================

/*
// In your component:
import { ITodo, TodoListProps } from '@/types';

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  // Component implementation
};

// In your API route:
import { ApiResponse, ITodo } from '@/types';

export async function GET(): Promise<Response> {
  const response: ApiResponse<ITodo[]> = {
    success: true,
    data: todos
  };
  return NextResponse.json(response);
}

// In your state:
import { TodoState } from '@/types';

const [state, setState] = useState<TodoState>({
  todos: [],
  loading: false,
  error: null
});
*/

// ==========================================
// VALIDATION TYPES
// ==========================================

/**
 * Validation Error
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Form Validation Result
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// ==========================================
// EXTENDED FEATURES (Future Use)
// ==========================================

/**
 * Todo with User Assignment (for multi-user support)
 */
export interface ITodoWithUser extends ITodo {
  userId: string;
  assignedTo?: string[];
}

/**
 * Todo Category
 */
export interface ITodoCategory {
  _id?: string;
  name: string;
  color: string;
}

/**
 * Todo with Category
 */
export interface ITodoWithCategory extends ITodo {
  categoryId?: string;
  category?: ITodoCategory;
}

/**
 * Todo Statistics
 */
export interface TodoStats {
  total: number;
  completed: number;
  active: number;
  completionRate: number;
}

export {};
