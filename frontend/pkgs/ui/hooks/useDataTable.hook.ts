/* react */
import { useCallback, useMemo, useState } from 'react';
/* types */
import type {
  CellSlotParams,
  Column,
  DataCellSlot,
  DataTable,
  HeaderCellSlotParams,
  HeaderDataCellSlot,
  SortBy,
} from '@ui/types';
/* utilities */
import { subtractSets } from '@utilities/functions';
/* utils */
import { filterListBySearchableColumns } from '@ui/utils';

export function useDataTable<T, K extends string | number | symbol = keyof T>() {
  /* raw data */
  const [rawData, updateRawData] = useState<T[]>([]);

  /* columns */
  const [columnsMap, setColumnsMap] = useState<Map<K, Column<T, K>>>(new Map<K, Column<T, K>>());

  const [searchableColumnsSet, setSearchableColumnsSet] = useState<Set<K>>(new Set<K>());
  const [hiddenColumnsSet, setHiddenColumnsSet] = useState<Set<K>>(new Set<K>());

  const hasSearchableColumns = useMemo(
    () => subtractSets(searchableColumnsSet, hiddenColumnsSet).size > 0,
    [hiddenColumnsSet, searchableColumnsSet]
  );

  const updateColumns = useCallback((columns: Column<T, K>[]) => {
    if (!columns.length) {
      return;
    }
    const newColumnsMap = new Map<K, Column<T, K>>();
    const newSearchableColumnsSet = new Set<K>();

    for (const column of columns) {
      newColumnsMap.set(column.key, column);

      if (column.searchable) {
        newSearchableColumnsSet.add(column.key);
      }
    }

    setColumnsMap(newColumnsMap);
    setSearchableColumnsSet(newSearchableColumnsSet);

    setHiddenColumnsSet(currentHiddenSet => {
      const newHiddenSet = new Set<K>();
      for (const column of columns) {
        if (currentHiddenSet.has(column.key) && column.hidable) {
          newHiddenSet.add(column.key);
        }
      }
      return newHiddenSet;
    });
  }, []);
  const appendColumns = useCallback((columns: Column<T, K>[]) => {
    if (!columns.length) return;

    setColumnsMap(currentColumnsMap => {
      const newColumnsMap = new Map(currentColumnsMap);
      for (const column of columns) {
        newColumnsMap.set(column.key, column);
      }
      return newColumnsMap;
    });

    setSearchableColumnsSet(currentSearchableColumnsSet => {
      const newSearchableColumnsSet = new Set(currentSearchableColumnsSet);
      for (const column of columns) {
        if (column.searchable) {
          newSearchableColumnsSet.add(column.key);
        }
      }
      return newSearchableColumnsSet;
    });
  }, []);

  const hideColumn = useCallback(
    (columnKey: K) => {
      if (
        !columnsMap.has(columnKey) ||
        !columnsMap.get(columnKey)?.hidable ||
        hiddenColumnsSet.has(columnKey)
      ) {
        return;
      }
      const newHiddenColumnsSet = new Set<K>(hiddenColumnsSet);
      newHiddenColumnsSet.add(columnKey);
      setHiddenColumnsSet(newHiddenColumnsSet);
    },
    [columnsMap, hiddenColumnsSet]
  );
  const showColumn = useCallback(
    (columnKey: K) => {
      if (!hiddenColumnsSet.has(columnKey)) {
        return;
      }
      const newHiddenColumnsSet = new Set<K>(hiddenColumnsSet);
      newHiddenColumnsSet.delete(columnKey);
      setHiddenColumnsSet(newHiddenColumnsSet);
    },
    [hiddenColumnsSet]
  );

  /* search param */
  const [searchParam, setSearchParam] = useState<string>('');

  /* misc */

  const [sortKey, setSortKey] = useState<K>();
  const [sortBy, setSortBy] = useState<SortBy>('ASC');

  const validSearchParam = useMemo<string>(
    () => (searchParam.trim().length > 3 ? searchParam.trim() : ''),
    [searchParam]
  );

  const dataTable = useMemo<DataTable<T, K>>(() => {
    const subtractedSearchableColumnsSet = subtractSets(searchableColumnsSet, hiddenColumnsSet);
    const shouldFilterRawData =
      subtractedSearchableColumnsSet.size > 0 && validSearchParam.length > 0;

    const filteredRawData = shouldFilterRawData
      ? filterListBySearchableColumns({
          list: rawData,
          columnsMap,
          searchableColumnsSet: subtractedSearchableColumnsSet,
          searchParam: validSearchParam,
        })
      : rawData;

    const header: HeaderDataCellSlot<K>[] = [];
    const rows: DataCellSlot<T, K>[][] = [];

    for (const [columnKey, columnValue] of columnsMap) {
      if (hiddenColumnsSet.has(columnKey)) {
        continue;
      }
      /* header */
      const headerParams: HeaderCellSlotParams<K> = {
        metadata: {
          currentPage: 1, // TODO
          perPage: 10, // TODO

          sortable: columnValue.sortable ?? false,
          sortKey,
          isSorted: sortKey === columnValue.key,
          sortBy,

          searchable: columnValue.searchable ?? false,
          searchParam: validSearchParam,

          hidable: columnValue.hidable ?? false,

          headerSpan: columnValue.headerSpan ?? 1,
          cellSpan: columnValue.cellSpan ?? 1,
        },
        sort: sortBy => {
          setSortKey(columnKey);
          setSortBy(sortBy);
        },
        hide: () => hideColumn(columnKey),
      };
      header.push({ params: headerParams, cell: columnValue.header });

      /* filtered item column */
      for (let rowIndex = 0; rowIndex < filteredRawData.length; rowIndex++) {
        const filteredItem = filteredRawData[rowIndex];

        const rowParams: CellSlotParams<T, K> = {
          row: filteredItem,
          metadata: {
            ...headerParams.metadata,
            value: columnValue.toString(filteredItem),
            index: 1, // TODO
            pageIndex: rowIndex,
          },
        };
        if (!rows[rowIndex]) {
          rows[rowIndex] = [];
        }
        rows[rowIndex].push({ params: rowParams, cell: columnValue.cell });
      }
    }

    return {
      header,
      rows,
    };
  }, [
    hideColumn,
    columnsMap,
    hiddenColumnsSet,
    rawData,
    searchableColumnsSet,
    sortBy,
    sortKey,
    validSearchParam,
  ]);

  return {
    rawData,
    updateRawData,

    updateColumns,
    appendColumns,

    hideColumn,
    showColumn,

    hasSearchableColumns,
    searchParam,
    setSearchParam,

    dataTable,
  };
}
