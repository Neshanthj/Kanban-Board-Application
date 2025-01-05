import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, Board, Column, Task } from '../types';
import { v4 as uuidv4 } from 'uuid';

const initialState: AppState = {
  boards: [],
  columns: [],
  tasks: [],
  darkMode: false,
  sortBy: 'dueDate',
  sortOrder: 'asc',
};

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    createBoard: (state, action: PayloadAction<{ title: string }>) => {
      const boardId = uuidv4();
      const newBoard: Board = {
        id: boardId,
        title: action.payload.title,
        columnIds: [],
      };

      // Create default columns
      const columns: Column[] = [
        { id: uuidv4(), title: 'To Do', taskIds: [], boardId },
        { id: uuidv4(), title: 'In Progress', taskIds: [], boardId },
        { id: uuidv4(), title: 'Done', taskIds: [], boardId },
      ];

      newBoard.columnIds = columns.map(col => col.id);
      state.boards.push(newBoard);
      state.columns.push(...columns);
    },

    deleteBoard: (state, action: PayloadAction<{ boardId: string }>) => {
      const { boardId } = action.payload;
      state.boards = state.boards.filter(board => board.id !== boardId);
      state.columns = state.columns.filter(column => column.boardId !== boardId);
      state.tasks = state.tasks.filter(task => task.boardId !== boardId);
    },

    createTask: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      const newTask: Task = {
        ...action.payload,
        id: uuidv4(),
      };
      state.tasks.push(newTask);
      const column = state.columns.find(col => col.id === newTask.columnId);
      if (column) {
        column.taskIds.push(newTask.id);
      }
    },

    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },

    deleteTask: (state, action: PayloadAction<{ taskId: string; columnId: string }>) => {
      const { taskId, columnId } = action.payload;
      state.tasks = state.tasks.filter(task => task.id !== taskId);
      const column = state.columns.find(col => col.id === columnId);
      if (column) {
        column.taskIds = column.taskIds.filter(id => id !== taskId);
      }
    },

    moveTask: (state, action: PayloadAction<{
      taskId: string;
      sourceColumnId: string;
      destinationColumnId: string;
      sourceIndex: number;
      destinationIndex: number;
    }>) => {
      const { taskId, sourceColumnId, destinationColumnId, sourceIndex, destinationIndex } = action.payload;
      
      const sourceColumn = state.columns.find(col => col.id === sourceColumnId);
      const destColumn = state.columns.find(col => col.id === destinationColumnId);
      
      if (sourceColumn && destColumn) {
        sourceColumn.taskIds.splice(sourceIndex, 1);
        destColumn.taskIds.splice(destinationIndex, 0, taskId);
        
        // Update task's columnId
        const task = state.tasks.find(t => t.id === taskId);
        if (task) {
          task.columnId = destinationColumnId;
        }
      }
    },

    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },

    setSortBy: (state, action: PayloadAction<{ field: 'dueDate' | 'priority' | 'assignee' }>) => {
      state.sortBy = action.payload.field;
      // Toggle sort order if clicking the same field
      if (state.sortBy === action.payload.field) {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortOrder = 'asc';
      }
    },

    importBoards: (state, action: PayloadAction<{ boards: Board[]; tasks: Task[] }>) => {
      state.boards = action.payload.boards;
      state.tasks = action.payload.tasks;
    },
  },
});

export const {
  createBoard,
  deleteBoard,
  createTask,
  updateTask,
  deleteTask,
  moveTask,
  toggleDarkMode,
  setSortBy,
  importBoards,
} = kanbanSlice.actions;

export default kanbanSlice.reducer;