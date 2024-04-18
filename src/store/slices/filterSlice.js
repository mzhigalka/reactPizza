import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const selectFilter = (state) => state.filter;

export const { setCategoryId, setSort, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
