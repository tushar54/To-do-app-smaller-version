import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Authslice";
import taskReducer from "./Taskslice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer, 
  },
});
