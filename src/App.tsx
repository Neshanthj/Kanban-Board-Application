import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import BoardList from './components/BoardList';
import Board from './components/Board';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Routes>
            <Route path="/" element={<BoardList />} />
            <Route path="/board/:boardId" element={<Board />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}