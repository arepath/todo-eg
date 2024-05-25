import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    initTasks(state, action) {
      return action.payload;
    }
  },
});

export const { initTasks } = taskSlice.actions;
export default taskSlice.reducer;