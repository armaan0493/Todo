# ✅ TODO App Implementation Checklist

Use this checklist to track your progress while building the application.

---

## 🎯 Phase 1: Setup & Configuration (15-20 mins)

### Project Initialization
- [ ] Run `npx create-next-app@latest todo-app --typescript --app`
- [ ] Navigate to project: `cd todo-app`
- [ ] Install Mongoose: `npm install mongoose`
- [ ] Create folder structure:
  ```bash
  mkdir -p lib models app/components app/api/todos/[id]
  ```

### MongoDB Atlas Setup
- [ ] Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
- [ ] Create new cluster
- [ ] Create database user (username & password)
- [ ] Whitelist IP address (0.0.0.0/0 for development)
- [ ] Get connection string
- [ ] Copy connection string for next step

### Environment Setup
- [ ] Create `.env.local` file in root
- [ ] Add MongoDB connection string:
  ```
  MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todos
  ```
- [ ] Verify `.env.local` is in `.gitignore`

---

## 🎯 Phase 2: Database Layer (10-15 mins)

### MongoDB Connection Helper
- [ ] Create `lib/mongodb.ts`
- [ ] Copy connection code from guide
- [ ] Add proper TypeScript types
- [ ] Test connection (will test in Phase 3)

### Todo Model
- [ ] Create `models/Todo.ts`
- [ ] Define ITodo interface
- [ ] Create Mongoose schema
- [ ] Add validation rules:
  - [ ] Title required
  - [ ] Title max length: 200
  - [ ] Completed default: false
- [ ] Add timestamps (createdAt, updatedAt)
- [ ] Export model

---

## 🎯 Phase 3: Backend API Layer (20-30 mins)

### Base Todos Route (`app/api/todos/route.ts`)
- [ ] Create file `app/api/todos/route.ts`
- [ ] Implement GET function:
  - [ ] Connect to database
  - [ ] Fetch all todos
  - [ ] Sort by createdAt (newest first)
  - [ ] Return success response
  - [ ] Add error handling
- [ ] Implement POST function:
  - [ ] Connect to database
  - [ ] Validate input (title required)
  - [ ] Create new todo
  - [ ] Return success response (201)
  - [ ] Add error handling

### Individual Todo Route (`app/api/todos/[id]/route.ts`)
- [ ] Create file `app/api/todos/[id]/route.ts`
- [ ] Implement GET function:
  - [ ] Validate MongoDB ObjectId
  - [ ] Fetch single todo
  - [ ] Return 404 if not found
  - [ ] Add error handling
- [ ] Implement PUT function:
  - [ ] Validate MongoDB ObjectId
  - [ ] Update todo
  - [ ] Run validators
  - [ ] Return updated todo
  - [ ] Return 404 if not found
  - [ ] Add error handling
- [ ] Implement DELETE function:
  - [ ] Validate MongoDB ObjectId
  - [ ] Delete todo
  - [ ] Return success message
  - [ ] Return 404 if not found
  - [ ] Add error handling

### API Testing (Optional but Recommended)
- [ ] Test GET /api/todos (empty array initially)
- [ ] Test POST /api/todos (create todo)
- [ ] Test GET /api/todos (should show created todo)
- [ ] Test PUT /api/todos/:id (update todo)
- [ ] Test DELETE /api/todos/:id (delete todo)

**Tools for testing:** Browser DevTools, Postman, or Thunder Client (VS Code extension)

---

## 🎯 Phase 4: Frontend Layer (30-45 mins)

### TodoList Component
- [ ] Create `app/components/TodoList.tsx`
- [ ] Define Todo interface
- [ ] Define TodoListProps interface
- [ ] Implement empty state message
- [ ] Map through todos array
- [ ] Add checkbox for toggle
- [ ] Add delete button
- [ ] Style the list items
- [ ] Add conditional styling (line-through for completed)

### Main Page Component
- [ ] Update `app/page.tsx`
- [ ] Set up state:
  - [ ] `todos` array
  - [ ] `newTodo` string
  - [ ] `loading` boolean
  - [ ] `error` string
- [ ] Implement `fetchTodos` function:
  - [ ] Fetch from API
  - [ ] Handle success
  - [ ] Handle errors
  - [ ] Set loading state
- [ ] Implement `addTodo` function:
  - [ ] Validate input (not empty)
  - [ ] POST to API
  - [ ] Clear input on success
  - [ ] Refresh todo list
  - [ ] Handle errors
- [ ] Implement `toggleTodo` function:
  - [ ] PUT to API with toggled status
  - [ ] Refresh todo list
  - [ ] Handle errors
- [ ] Implement `deleteTodo` function:
  - [ ] Add confirmation dialog
  - [ ] DELETE from API
  - [ ] Refresh todo list
  - [ ] Handle errors
- [ ] Add `useEffect` to fetch todos on mount
- [ ] Add Enter key handler for input
- [ ] Build UI layout:
  - [ ] Header/title
  - [ ] Input field + Add button
  - [ ] Error message display
  - [ ] TodoList component
  - [ ] Stats (remaining count)

---

## 🎯 Phase 5: Enhancement & Polish (20-30 mins)

### Input Validation
- [ ] Check for empty/whitespace-only input
- [ ] Show error message for invalid input
- [ ] Disable button while loading

### User Experience
- [ ] Add loading indicators
- [ ] Show error messages clearly
- [ ] Add confirmation for delete
- [ ] Disable inputs during API calls
- [ ] Clear error after successful action

### Styling
- [ ] Center content (max-width: 600px)
- [ ] Add padding and margins
- [ ] Style buttons with hover states
- [ ] Style todo items (cards)
- [ ] Add responsive design
- [ ] Choose color scheme

### Stats & Features
- [ ] Display total todos count
- [ ] Display remaining todos count
- [ ] Show completion percentage (optional)
- [ ] Add "Clear completed" button (optional)

---

## 🎯 Phase 6: Testing (20-30 mins)

### Manual Testing
- [ ] Test: Create new todo
- [ ] Test: Create multiple todos
- [ ] Test: Mark todo as completed
- [ ] Test: Unmark completed todo
- [ ] Test: Delete todo
- [ ] Test: Delete multiple todos
- [ ] Test: Empty input validation
- [ ] Test: Very long title (200+ chars)
- [ ] Test: Special characters in title
- [ ] Test: Refresh page (persistence)

### Error Scenarios
- [ ] Test: Create todo with empty title
- [ ] Test: Invalid todo ID (manual URL edit)
- [ ] Test: Network error simulation

### Browser Testing
- [ ] Test in Chrome
- [ ] Test in Firefox (optional)
- [ ] Test on mobile viewport
- [ ] Check browser console for errors
- [ ] Check network tab for API calls

---

## 🎯 Phase 7: Deployment (20-30 mins)

### Git Setup
- [ ] Initialize Git: `git init`
- [ ] Create `.gitignore` (ensure .env.local is included)
- [ ] Stage files: `git add .`
- [ ] Commit: `git commit -m "Initial commit: Full stack todo app"`
- [ ] Create GitHub repository
- [ ] Add remote: `git remote add origin <url>`
- [ ] Push: `git push -u origin main`

### Vercel Deployment
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Sign in with GitHub
- [ ] Click "New Project"
- [ ] Import your repository
- [ ] Configure project:
  - [ ] Framework Preset: Next.js
  - [ ] Root Directory: ./
  - [ ] Build Command: (default)
  - [ ] Output Directory: (default)
- [ ] Add environment variable:
  - [ ] Name: `MONGODB_URI`
  - [ ] Value: (your MongoDB connection string)
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete

### Post-Deployment
- [ ] Visit deployed URL
- [ ] Test all CRUD operations
- [ ] Check Vercel logs for errors
- [ ] Share your app! 🎉

---

## 🚀 Optional Enhancements (Future)

### Features
- [ ] Edit todo inline
- [ ] Add due dates
- [ ] Add categories/tags
- [ ] Add priority levels
- [ ] Filter todos (all/active/completed)
- [ ] Sort todos (date/title/priority)
- [ ] Search functionality
- [ ] Bulk actions (select multiple)
- [ ] Dark mode toggle

### Advanced
- [ ] Add user authentication
- [ ] Implement server actions (no fetch)
- [ ] Add optimistic UI updates
- [ ] Implement real-time sync
- [ ] Add animation/transitions
- [ ] Progressive Web App (PWA)
- [ ] Add unit tests
- [ ] Add E2E tests

---

## 📊 Progress Tracker

**Started:** _______________  
**Completed:** _______________  
**Total Time:** _______________

### Phase Completion
- [ ] Phase 1: Setup ✅
- [ ] Phase 2: Database ✅
- [ ] Phase 3: Backend API ✅
- [ ] Phase 4: Frontend ✅
- [ ] Phase 5: Polish ✅
- [ ] Phase 6: Testing ✅
- [ ] Phase 7: Deployment ✅

---

## 🎯 Success Criteria

Your app is complete when:
- ✅ You can create new todos
- ✅ You can mark todos as complete/incomplete
- ✅ You can delete todos
- ✅ Data persists after page refresh
- ✅ All API endpoints work correctly
- ✅ Error messages display properly
- ✅ App is deployed and accessible online

---

## 📝 Notes & Issues

Use this space to track any issues or notes:

```
Issue: _______________________________________________
Solution: _____________________________________________

Issue: _______________________________________________
Solution: _____________________________________________
```

---

**Remember:** 
- Take breaks between phases
- Test frequently
- Commit your code regularly
- Ask for help when stuck
- Celebrate small wins! 🎉

**Good luck building your TODO app!** 🚀
