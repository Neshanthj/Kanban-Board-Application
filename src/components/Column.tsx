import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { Plus } from 'lucide-react';
import { RootState } from '../store';
import { Column as ColumnType, Task } from '../types';
import TaskCard from './TaskCard';
import { createTask } from '../store/kanbanSlice';

interface ColumnProps {
  column: ColumnType;
  boardId: string;
}

export default function Column({ column, boardId }: ColumnProps) {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) =>
    state.kanban.tasks.filter(task => column.taskIds.includes(task.id))
  );

  const handleAddTask = () => {
    const title = prompt('Enter task title:');
    if (title) {
      dispatch(createTask({
        title,
        description: '',
        assignee: '',
        priority: 'medium',
        dueDate: new Date().toISOString(),
        columnId: column.id,
        boardId,
      }));
    }
  };

  return (
    <div className="w-80 flex flex-col bg-gray-100 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{column.title}</h3>
        <button
          onClick={handleAddTask}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <Plus size={20} />
        </button>
      </div>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex-1 overflow-y-auto"
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}