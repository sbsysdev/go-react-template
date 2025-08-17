/* types */
import type { Slot } from './slot.type';

export type SortBy = 'ASC' | 'DESC';

export type DataKey = string | number | symbol;

/* header */
export interface HeaderCellSlotMetadata<K extends DataKey> {
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

export interface HeaderCellSlotParams<K extends DataKey> {
  metadata: HeaderCellSlotMetadata<K>;
  sort: (sortBy: SortBy) => void;
  hide: () => void;
}

export type HeaderCellSlot<K extends DataKey> = (params: HeaderCellSlotParams<K>) => Slot;

/* rows */
export interface CellSlotMetadata<K extends DataKey> extends HeaderCellSlotMetadata<K> {
  value: string;

  dataIndex: number;
  pageIndex: number;
}

export interface CellSlotParams<T, K extends DataKey> {
  row: T;
  metadata: CellSlotMetadata<K>;
}

export type CellSlot<T, K extends DataKey> = (params: CellSlotParams<T, K>) => Slot;

export interface Column<T, K extends DataKey> {
  key: K;

  header: HeaderCellSlot<K>;
  headerSpan?: number;

  toString?: (row: T) => string;
  cell: CellSlot<T, K>;
  cellSpan?: number;

  sortable?: boolean;
  searchable?: boolean;
  hidable?: boolean;
}

export interface HeaderDataCellSlot<K extends DataKey> {
  params: HeaderCellSlotParams<K>;
  cell: HeaderCellSlot<K>;
}

export interface DataCellSlot<T, K extends DataKey> {
  params: CellSlotParams<T, K>;
  cell: CellSlot<T, K>;
}

export interface DataHeader<K extends DataKey> {
  cells: HeaderDataCellSlot<K>[];
}

export interface DataRow<T, K extends DataKey> {
  item: T;
  cells: DataCellSlot<T, K>[];
}

export interface DataTable<T, K extends DataKey> {
  header: DataHeader<K>;
  rows: DataRow<T, K>[];
  totalPages: number;
  safeCurrentPage: number;
  totalItems: number;
}
