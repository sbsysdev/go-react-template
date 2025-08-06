import type { Slot } from './slot.type';

export type CellSlot<T, K> = (row: T, value: K, counter: number) => Slot;

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

export type DataTable<T> = {
  rows?: T[];
  columns?: Column<T>[];
};

export type SortBy = 'ASC' | 'DESC';
export type RowCounter = 'page' | 'global';

export type DataTableProps<T> = {
  perPage?: number;
  currentPage?: number;
  search?: string;
  sortKey?: keyof T | null;
  sortBy?: SortBy;
  rowCounter?: RowCounter;
  hidden?: (keyof T)[];
};
