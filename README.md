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
- Import/export tasks and boards (JSON).

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
- below have working screenshot of the project

- <img width="950" alt="Screenshot 2025-01-05 164551" src="https://github.com/user-attachments/assets/c0c1fff0-4c28-4462-beff-a0e91d1bc1f1" />

<img width="950" alt="Screenshot 2025-01-05 164715" src="https://github.com/user-attachments/assets/d2bdb930-1f7c-4252-a378-a8ae18e6c17c" />

<img width="946" alt="Screenshot 2025-01-05 164825" src="https://github.com/user-attachments/assets/201e8265-1bfb-440e-ad58-ae04ca90e824" />

<img width="950" alt="Screenshot 2025-01-05 164946" src="https://github.com/user-attachments/assets/f2549641-3895-44eb-a9b8-080d2fe6939e" />

<img width="953" alt="Screenshot 2025-01-05 165011" src="https://github.com/user-attachments/assets/6d0751a0-83a1-4698-8e2c-e68eda5ba217" />

<img width="959" alt="Screenshot 2025-01-05 165457" src="https://github.com/user-attachments/assets/79d84cac-b4f2-424e-a07b-826068b76c81" />

<img width="919" alt="Screenshot 2025-01-05 165742" src="https://github.com/user-attachments/assets/ce449da9-ec22-4e99-9849-b26ed2b38bb5" />

<img width="958" alt="Screenshot 2025-01-05 170249" src="https://github.com/user-attachments/assets/85f70835-4292-45a6-8307-5c61834f7798" />

<img width="959" alt="Screenshot 2025-01-05 170217" src="https://github.com/user-attachments/assets/18634bde-c2a9-40ed-8781-866f393118a6" />

- mobile responsive screenshot

<img width="692" alt="Screenshot 2025-01-05 170025" src="https://github.com/user-attachments/assets/b90d1c2b-c82a-48b5-8dc4-a816a845ea82" />

<img width="713" alt="Screenshot 2025-01-05 170113" src="https://github.com/user-attachments/assets/b1029609-5a34-4428-8fd8-4db98f91e12f" />

