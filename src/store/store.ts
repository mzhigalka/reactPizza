import cartSlice from "./cart/slice";
import itemsSlice from "./items/slice";
import filterSlice from "./filter/slice";
import { configureStore } from "@reduxjs/toolkit";

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