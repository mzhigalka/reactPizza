import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchItems = createAsyncThunk(
  "items/fetchItemsStatus",
  async (params) => {
    const { categoryId, sortType } = params;

    const { data } = await axios.get(
      `https://f4e78433cae02a7d.mokky.dev/items?${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sortType}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", // loading | success | error
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchItems.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const selectItems = (state) => state.itemsSlice;

export const { setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
