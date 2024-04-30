import axios from "axios";
import { FetchItemsArgs, Items } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";

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