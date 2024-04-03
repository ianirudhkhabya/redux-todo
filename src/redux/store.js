import { configureStore } from "@reduxjs/toolkit";
import todoSliceReducer from "./slice";

export const store = configureStore({
  reducer: todoSliceReducer,
});
