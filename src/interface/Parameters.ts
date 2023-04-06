export interface ISort {
  sort_field?: string;
  sort_type?: "asc" | "desc" | "";
}

export interface ICommonFetchParams {
  page: number;
  size: number;
  search: string;
}

export interface ICommonFetchWithSortParams extends ICommonFetchParams, ISort {}

export interface ICommonFetchWithStoreAndSort extends Omit<ICommonFetchWithSortParams, "search"> {
  search?: string;
  store_id: string;
}
