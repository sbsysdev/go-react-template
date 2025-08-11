/* types */
import type { Slot } from './slot.type';

export type SortBy = 'ASC' | 'DESC';

/* header */
export interface HeaderCellSlotMetadata<K extends string | number | symbol> {
  currentPage: number;
  perPage: number;

  sortable: boolean;
  sortKey?: K;
  isSorted: boolean;
  sortBy: SortBy;

  searchable: boolean;
  searchParam: string;

  hidable: boolean;

  headerSpan: number;
  cellSpan: number;
}

export interface HeaderCellSlotParams<K extends string | number | symbol> {
  metadata: HeaderCellSlotMetadata<K>;
  sort: (sortBy: SortBy) => void;
  hide: () => void;
}

export type HeaderCellSlot<K extends string | number | symbol> = (
  params: HeaderCellSlotParams<K>
) => Slot;

/* rows */
export interface CellSlotMetadata<K extends string | number | symbol>
  extends HeaderCellSlotMetadata<K> {
  value: string;

  index: number;
  pageIndex: number;
}

export interface CellSlotParams<T, K extends string | number | symbol> {
  row: T;
  metadata: CellSlotMetadata<K>;
}

export type CellSlot<T, K extends string | number | symbol> = (
  params: CellSlotParams<T, K>
) => Slot;

export interface Column<T, K extends string | number | symbol> {
  key: K;

  header: HeaderCellSlot<K>;
  headerSpan?: number;

  toString: (row: T) => string;
  cell: CellSlot<T, K>;
  cellSpan?: number;

  sortable?: boolean;
  searchable?: boolean;
  hidable?: boolean;
}

export interface HeaderDataCellSlot<K extends string | number | symbol> {
  params: HeaderCellSlotParams<K>;
  cell: HeaderCellSlot<K>;
}

export interface DataCellSlot<T, K extends string | number | symbol> {
  params: CellSlotParams<T, K>;
  cell: CellSlot<T, K>;
}

export interface DataTable<T, K extends string | number | symbol> {
  header: HeaderDataCellSlot<K>[];
  rows: DataCellSlot<T, K>[][];
}
