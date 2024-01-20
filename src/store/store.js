import { configureStore } from "@reduxjs/toolkit";
import authService from "./authSlice";

const store = configureStore({
  reducer: { authService },
});

export default store;
