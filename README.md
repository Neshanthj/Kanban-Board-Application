# Board and Task Management Application

## Overview

Manage tasks effectively with boards and columns, featuring a responsive interface and advanced state management.

---

## Features

### **Board and Column Management**

- Create and name multiple boards.
- Default columns: **To-Do**, **In Progress**, **Done**.
- Rename or delete columns.

### **Task Management**

- Add tasks with:
  - Name, description, assignee, priority, due date.
- Edit, delete, or update tasks.
- Color-coded priorities (High = Red, Medium = Yellow, Low = Green).

### **Storage Persistence**

- State saved locally with `localStorage` for data continuity.

### **Advanced State Management**

- Powered by Redux Toolkit:
  - Manage boards, columns, tasks.
  - Sort tasks by due date, priority, or assignee.
  - Customize user preferences (dark mode, layouts).

### **Interactive Interface**

- Overview of all boards and individual board views.
- Visual alerts for overdue tasks (highlighted in red).

### **Optional Features**

- Progress tracker for completed tasks.
- Task search across all boards.
- Import/export tasks and boards (JSON or CSV).

---

## Running the Application

### **Setup**

1. Clone the repository:
   ```bash
   https://github.com/Neshanthj/Kanban-Board-Application.git
   ```

````
2. Install dependencies:
   ```bash
npm install
````

### **Development**

Start the application:

```bash
npm run dev
```

Access it at `http://localhost:5173`.

### **Production Build**

Generate a production-ready build:

```bash
npm run build
```

---

## Data Synchronization

Changes to boards, columns, and tasks are saved automatically using `localStorage` for seamless continuity across sessions.

---

## Home Page Features

- **Search Bar**: Find tasks across boards.
- **Create Button**: Add new boards.
- **Import/Export**: Save or load boards and tasks.

Navigate to individual boards to:

- Manage columns (**To-Do**, **In Progress**, **Done**).
- Add, edit, or delete tasks with visual indicators for priorities and overdue tasks.

