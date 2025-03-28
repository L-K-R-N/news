import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./news/newsSlice";

export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});

// Типы для удобства
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
