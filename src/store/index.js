import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './reducers/taskReducer';
import goalReducer from './reducers/goalReducer';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    goals: goalReducer,
  },
});

export default store;