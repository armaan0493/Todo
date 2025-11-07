# 🚀 Quick Reference Guide

## 📋 Common Commands

### Setup
```bash
# Create project
npx create-next-app@latest todo-app --typescript --app

# Install dependencies
npm install mongoose

# Run development server
npm run dev

# Build for production
npm run build
```

### Git Commands
```bash
git init
git add .
git commit -m "message"
git push origin main
```

---

## 🔗 API Endpoints Reference

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/api/todos` | Get all todos | - |
| `POST` | `/api/todos` | Create new todo | `{ title: string }` |
| `GET` | `/api/todos/:id` | Get single todo | - |
| `PUT` | `/api/todos/:id` | Update todo | `{ title?, completed? }` |
| `DELETE` | `/api/todos/:id` | Delete todo | - |

---

## 📦 Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## 🎯 Common Code Snippets

### Fetch Data (GET)
```typescript
const response = await fetch('/api/todos');
const result = await response.json();
if (result.success) {
  setTodos(result.data);
}
```

### Create Data (POST)
```typescript
const response = await fetch('/api/todos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'New Todo' })
});
```

### Update Data (PUT)
```typescript
const response = await fetch(`/api/todos/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ completed: true })
});
```

### Delete Data (DELETE)
```typescript
const response = await fetch(`/api/todos/${id}`, {
  method: 'DELETE'
});
```

---

## 🐛 Common Issues & Solutions

### Issue: MongoDB Connection Error
**Solution**: Check `.env.local` file and ensure `MONGODB_URI` is correct

### Issue: "Module not found"
**Solution**: Run `npm install` to install all dependencies

### Issue: API returns 404
**Solution**: Ensure file structure matches:
- `app/api/todos/route.ts`
- `app/api/todos/[id]/route.ts`

### Issue: TypeScript errors
**Solution**: Add types to all variables and props

### Issue: Todos not displaying
**Solution**: 
1. Check browser console for errors
2. Verify API is returning data
3. Check MongoDB connection

---

## 🎨 Styling Tips

### Basic CSS Styles
```css
/* Center content */
max-width: 600px;
margin: 0 auto;
padding: 2rem;

/* Card style */
background-color: #f9f9f9;
border-radius: 8px;
padding: 1rem;
border: 1px solid #e0e0e0;

/* Button style */
padding: 0.75rem 1.5rem;
background-color: #0070f3;
color: white;
border: none;
border-radius: 8px;
cursor: pointer;
```

### Tailwind CSS (Optional)
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 🔐 Environment Variables

### Required Variables
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
```

### MongoDB Atlas Connection String Format
```
mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
```

---

## ✅ Pre-Deployment Checklist

- [ ] All features working locally
- [ ] `.env.local` not committed to Git
- [ ] MongoDB Atlas configured
- [ ] All TypeScript errors resolved
- [ ] Production build successful (`npm run build`)
- [ ] Environment variables added to Vercel
- [ ] Test deployed application

---

## 🔗 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Vercel Deployment](https://vercel.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 📞 Need Help?

1. Check browser console for errors
2. Check terminal for server errors
3. Review the main guide: `TODO-APP-GUIDE.md`
4. Check MongoDB Atlas connection
5. Verify environment variables

---

**Quick Start Command:**
```bash
npx create-next-app@latest todo-app --typescript --app && cd todo-app && npm install mongoose && npm run dev
```
