import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    initTasks(state, action) {
      return action.payload;
    },
    addTask(state, action) {
      fetch("http://localhost:3001/task/addTask", {
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
          console.error("Error adding task:", error);
        });
    },
    removeTask(state, action) {
      fetch(`http://localhost:3001/task/deleteTask/${action.payload}`, {
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

export const { addTask, removeTask, initTasks } = taskSlice.actions;
export default taskSlice.reducer;