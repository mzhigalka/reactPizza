export type FetchItemsArgs = {
  categoryId: number;
  sortType: string;
  search: string;
}

export type Items = {
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

export interface ItemsSliceState {
  items: Items[];
  status: Status;
}