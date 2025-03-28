import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INewsItem } from "../../types/news";

const initialState: INewsItem[] = JSON.parse(
  localStorage.getItem("news_data") || "[]"
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    addNews: (state, action: PayloadAction<INewsItem>) => {
      state.push(action.payload);
      localStorage.setItem("news_data", JSON.stringify(state));
    },
    updateNews: (state, action: PayloadAction<INewsItem>) => {
      const index = state.findIndex((n) => n.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        localStorage.setItem("news_data", JSON.stringify(state));
      }
    },
    deleteNews: (state, action: PayloadAction<string>) => {
      const filtered = state.filter((n) => n.id !== action.payload);
      localStorage.setItem("news_data", JSON.stringify(filtered));
      return filtered;
    },
  },
});

export const { addNews, updateNews, deleteNews } = newsSlice.actions;
export default newsSlice.reducer;
