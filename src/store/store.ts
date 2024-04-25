import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import itemsSlice from "./slices/itemsSlice";
import cartSlice from "./slices/cartSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    itemsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();