import { configureStore } from '@reduxjs/toolkit';
import kanbanReducer from './kanbanSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('kanbanState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('kanbanState', serializedState);
  } catch (err) {
    // Handle errors
  }
};

const store = configureStore({
  reducer: {
    kanban: kanbanReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;