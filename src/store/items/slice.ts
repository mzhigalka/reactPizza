import { fetchItems } from "./asyncActions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Items, ItemsSliceState, Status } from "./types";

const initialState: ItemsSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Items[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});


export const { setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
