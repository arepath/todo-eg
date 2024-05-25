import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    initGoals(state, action) {
      return action.payload;
    },
    addGoal(state, action) {
      fetch("http://localhost:3001/goal/addGoal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "123456"
        },
        body: JSON.stringify(action.payload),
      })
        .then(response => response.json())
        .then(data => {
          return data;
          
        })
        .catch(error => {
          console.error("Error adding goal:", error);
        });
    },
    removeGoal(state, action) {
      fetch(`http://localhost:3001/goal/deleteGoal/${action.payload}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "123456"
        },
      })
        .then(response => response.json())
        .then(data => {
          return data;
        })
        .catch(error => {
          console.error("Error deleting goal:", error);
        });
    },
  },
});

export const { addGoal, removeGoal, initGoals } = goalSlice.actions;
export default goalSlice.reducer;