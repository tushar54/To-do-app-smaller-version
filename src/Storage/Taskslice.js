import { createSlice } from '@reduxjs/toolkit';

const loadTasksFromLocalStorage = () => {
  try {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    return { tasks, completedTasks };
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return { tasks: [], completedTasks: [] };
  }
};

const saveTasksToLocalStorage = (tasks, completedTasks) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

const initialState = loadTasksFromLocalStorage();

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveTasksToLocalStorage(state.tasks, state.completedTasks);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks, state.completedTasks);
    },
    completeTask: (state, action) => {
      const taskIndex = state.tasks.findIndex((task) => task.id === action.payload);
      if (taskIndex !== -1) {
        const completedTask = state.tasks.splice(taskIndex, 1)[0];
        state.completedTasks.push(completedTask);
        saveTasksToLocalStorage(state.tasks, state.completedTasks);
      }
    },
    setPriority: (state, action) => {
      const taskIndex = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex].priority = action.payload.priority;
        saveTasksToLocalStorage(state.tasks, state.completedTasks);
      }
    },
  },
});

export const { addTask, deleteTask, completeTask, setPriority } = taskSlice.actions;
export default taskSlice.reducer;
