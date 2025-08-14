/* types */
import type {
  CellSlotParams,
  Column,
  DataCellSlot,
  HeaderCellSlotParams,
  HeaderDataCellSlot,
  SortBy,
} from '@ui/types';

interface SerializeListToDataTableParams<T, K extends string | number | symbol> {
  columnsMap: Map<K, Column<T, K>>;
  hiddenColumnsSet: Set<K>;
  currentPage: number;
  perPage: number;
  sortKey?: K;
  sortBy: SortBy;
  searchParam: string;
  sortColumn: (key: K, sortBy: SortBy) => void;
  hideColumn: (key: K) => void;
  list: T[];
  pageStartIndex: number;
}

export function serializeListToDataTable<T, K extends string | number | symbol>({
  columnsMap,
  hiddenColumnsSet,
  currentPage,
  perPage,
  sortKey,
  sortBy,
  searchParam,
  sortColumn,
  hideColumn,
  list,
  pageStartIndex,
}: SerializeListToDataTableParams<T, K>) {
  const header: HeaderDataCellSlot<K>[] = [];
  const rows: DataCellSlot<T, K>[][] = [];

  for (const [columnKey, columnValue] of columnsMap) {
    if (hiddenColumnsSet.has(columnKey)) {
      continue;
    }
    /* header */
    const headerParams: HeaderCellSlotParams<K> = {
      metadata: {
        currentPage,
        perPage,

        sortable: columnValue.sortable ?? false,
        sortKey,
        isSorted: sortKey === columnValue.key,
        sortBy,

        searchable: columnValue.searchable ?? false,
        searchParam,

        hidable: columnValue.hidable ?? false,

        headerSpan: columnValue.headerSpan ?? 1,
        cellSpan: columnValue.cellSpan ?? 1,
      },
      sort: sortBy => sortColumn(columnKey, sortBy),
      hide: () => hideColumn(columnKey),
    };
    header.push({ params: headerParams, cell: columnValue.header });

    /* filtered item column */
    for (let index = 0; index < list.length; index++) {
      const item = list[index];

      const rowParams: CellSlotParams<T, K> = {
        row: item,
        metadata: {
          ...headerParams.metadata,
          value: columnValue.toString(item),
          dataIndex: pageStartIndex + index,
          pageIndex: index,
        },
      };
      if (!rows[index]) {
        rows[index] = [];
      }
      rows[index].push({ params: rowParams, cell: columnValue.cell });
    }
  }

  return { header, rows };
}
