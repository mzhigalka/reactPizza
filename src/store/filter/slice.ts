import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilteSliceState, Sort, SortProperyEnum } from "./types";

const initialState: FilteSliceState = {
  searchValue: "",
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: SortProperyEnum.PRICE_DESC,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setFilters(state, action: PayloadAction<FilteSliceState>) {
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
