import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, Trash2, Download, Upload, Search, Moon, Sun } from 'lucide-react';
import { RootState } from '../store';
import { createBoard, deleteBoard, importBoards, toggleDarkMode } from '../store/kanbanSlice';
import { calculateBoardProgress } from '../utils/boardUtils';
import SearchBar from './SearchBar';

export default function BoardList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const boards = useSelector((state: RootState) => state.kanban.boards);
  const tasks = useSelector((state: RootState) => state.kanban.tasks);
  const darkMode = useSelector((state: RootState) => state.kanban.darkMode);

  const handleCreateBoard = () => {
    const title = prompt('Enter board title:');
    if (title) {
      dispatch(createBoard({ title }));
    }
  };

  const handleDeleteBoard = (boardId: string) => {
    if (confirm('Are you sure you want to delete this board?')) {
      dispatch(deleteBoard({ boardId }));
    }
  };

  const handleExport = () => {
    const state = {
      boards: boards,
      tasks: tasks,
    };
    const dataStr = JSON.stringify(state);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'kanban-export.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const data = JSON.parse(content);
          dispatch(importBoards(data));
        } catch (error) {
          alert('Error importing file. Please ensure it is a valid JSON export.');
        }
      };
      reader.readAsText(file);
    }
  };

  const filteredBoards = boards.filter(board => 
    board.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold dark:text-white">My Boards</h1>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <div className="flex gap-2">
              <button
                onClick={() => dispatch(toggleDarkMode())}
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={handleCreateBoard}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Plus size={20} />
                <span className="hidden sm:inline">New Board</span>
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <Download size={20} />
                <span className="hidden sm:inline">Export</span>
              </button>
              <label className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 cursor-pointer">
                <Upload size={20} />
                <span className="hidden sm:inline">Import</span>
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleImport}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBoards.map((board) => {
            const progress = calculateBoardProgress(board.id, tasks);
            return (
              <div
                key={board.id}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-semibold dark:text-white">{board.title}</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/board/${board.id}`)}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                    >
                      Open
                    </button>
                    <button
                      onClick={() => handleDeleteBoard(board.id)}
                      className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  Progress: {progress}%
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}