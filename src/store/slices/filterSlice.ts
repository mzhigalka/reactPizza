import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortProperyEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  TITLE_DESC = "title",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
}

export type Sort = {
  name: string,
  sortProperty: SortProperyEnum,
}

export interface FilteSliceState {
  searchValue: string;
  categoryId: number;
  sort: Sort;
}

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

export const selectFilter = (state: RootState) => state.filterSlice;
export const selectSort = (state: RootState) => state.filterSlice.sort;

export const { setCategoryId, setSort, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
