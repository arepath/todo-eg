import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    initGoals(state, action) {
      return action.payload;
    },
  },
});

export const { initGoals } = goalSlice.actions;
export default goalSlice.reducer;