import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import itemsSlice from "./slices/itemsSlice";
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    itemsSlice,
  },
});
