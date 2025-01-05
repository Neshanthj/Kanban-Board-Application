import { Task } from '../types';

export const calculateBoardProgress = (boardId: string, tasks: Task[]): number => {
  const boardTasks = tasks.filter(task => task.boardId === boardId);
  if (boardTasks.length === 0) return 0;
  
  let totalProgress = 0;
  
  boardTasks.forEach(task => {
    const columnTitle = task.columnId.toLowerCase();
    if (columnTitle.includes('done')) {
      totalProgress += 100;
    } else if (columnTitle.includes('progress')) {
      totalProgress += 50;
    }
    // Tasks in 'To Do' contribute 0% to progress
  });
  
  // Calculate average progress across all tasks
  return Math.round(totalProgress / boardTasks.length);
};