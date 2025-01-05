import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { moveTask } from '../store/kanbanSlice';
import { RootState } from '../store';
import Column from './Column';
import { ArrowLeft } from 'lucide-react';

export default function Board() {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const board = useSelector((state: RootState) =>
    state.kanban.boards.find(b => b.id === boardId)
  );

  const columns = useSelector((state: RootState) =>
    state.kanban.columns.filter(col => col.boardId === boardId)
  );

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    dispatch(moveTask({
      taskId: draggableId,
      sourceColumnId: source.droppableId,
      destinationColumnId: destination.droppableId,
      sourceIndex: source.index,
      destinationIndex: destination.index,
    }));
  };

  if (!board) return <div>Board not found</div>;

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">{board.title}</h1>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex-1 overflow-x-auto p-6">
          <div className="flex gap-6 h-full">
            {columns.map(column => (
              <Column
                key={column.id}
                column={column}
                boardId={boardId!}
              />
            ))}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}