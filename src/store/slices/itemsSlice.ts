import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export type FetchItemsArgs = {
  categoryId: number;
  sortType: string;
  search: string;
}

type Items = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface ItemsSliceState {
  items: Items[];
  status: Status;
}

const initialState: ItemsSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};


export const fetchItems = createAsyncThunk<Items[], FetchItemsArgs>(
  "items/fetchItemsStatus",
  async (params) => {
    const { categoryId, sortType } = params;

    const { data } = await axios.get<Items[]>(
      `https://f4e78433cae02a7d.mokky.dev/items?${categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sortType}`
    );

    return data;
  }
);

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

export const selectItems = (state: RootState) => state.itemsSlice;

export const { setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
