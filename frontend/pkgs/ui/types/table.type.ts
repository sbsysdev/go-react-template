import type { Slot } from './slot.type';

export type SortBy = 'ASC' | 'DESC';

export interface CellSlotMetadata<T> {
  index: number;
  pageIndex: number;
  currentPage: number;
  perPage: number;
  sortKey: T[keyof T];
  isSorted: boolean;
  sortBy: SortBy;
  search: string;
  sortable: boolean;
  searchable: boolean;
  hidable: boolean;
}

export interface CellSlotParams<T, K> {
  row: T;
  value: K;
  metadata: CellSlotMetadata<T>;
}

export type CellSlot<T, K> = (params: CellSlotParams<T, K>) => Slot;

export type Column<T> = {
  [K in keyof T]: {
    key: K;
    header?: Slot | CellSlot<T, T[K]>;
    cell: CellSlot<T, T[K]>;
    sortable?: boolean;
    searchable?: boolean;
    hidable?: boolean;
  };
}[keyof T];

export interface DataTableParams<T> {
  search?: string;

  sortKey?: keyof T | null;
  sortBy?: SortBy;

  paginate?: boolean;
  currentPage?: number;
  perPage?: number;
}
