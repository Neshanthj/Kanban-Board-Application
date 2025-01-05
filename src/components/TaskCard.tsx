import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { format, isPast } from 'date-fns';
import { Calendar, User, Flag, Trash2, Edit } from 'lucide-react';
import { Task } from '../types';
import { deleteTask, updateTask } from '../store/kanbanSlice';
import { TaskEditModal } from './Task';

interface TaskCardProps {
  task: Task;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export default function TaskCard({ task }: TaskCardProps) {
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isOverdue = isPast(new Date(task.dueDate));

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask({ taskId: task.id, columnId: task.columnId }));
    }
  };

  return (
    <>
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-3 border-l-4 ${
        isOverdue ? 'border-red-500' : `border-${priorityColors[task.priority].split(' ')[0].replace('bg-', '')}`
      }`}>
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400">
            {task.title}
          </h4>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-1 text-gray-400 hover:text-blue-500 rounded"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 text-gray-400 hover:text-red-500 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
          {task.assignee && (
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
              <User size={14} />
              <span>{task.assignee}</span>
            </div>
          )}

          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
            <Calendar size={14} />
            <span className={isOverdue ? 'text-red-600 dark:text-red-400 font-medium' : ''}>
              {format(new Date(task.dueDate), 'MMM d')}
            </span>
          </div>

          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
            <Flag size={14} />
            <span className="capitalize">{task.priority}</span>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <TaskEditModal
          task={task}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(updatedTask) => {
            dispatch(updateTask(updatedTask));
            setIsEditModalOpen(false);
          }}
        />
      )}
    </>
  );
}