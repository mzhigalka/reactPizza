import { RootState } from "../store";


export const selectCart = (state: RootState) => state.cartSlice;

export const selectItem = (state: RootState) =>
  state.cartSlice.items.find((obj) => obj.count);

export const selectCartItemById = (id: number) => (state: RootState) =>
  state.cartSlice.items.find((obj) => obj.id === id);
