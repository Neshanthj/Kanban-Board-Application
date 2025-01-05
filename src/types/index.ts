export type Priority = 'low' | 'medium' | 'high';
export type SortOrder = 'asc' | 'desc';
export type SortField = 'dueDate' | 'priority' | 'assignee';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: Priority;
  dueDate: string;
  columnId: string;
  boardId: string;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
  boardId: string;
}

export interface Board {
  id: string;
  title: string;
  columnIds: string[];
}

export interface AppState {
  boards: Board[];
  columns: Column[];
  tasks: Task[];
  darkMode: boolean;
  sortBy: SortField;
  sortOrder: SortOrder;
}