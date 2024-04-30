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