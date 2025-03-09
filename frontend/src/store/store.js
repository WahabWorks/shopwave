import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice.js";
import categoriesReducer from "./features/categories/categoriesSlice.js";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
  },
});                                                                                                                         