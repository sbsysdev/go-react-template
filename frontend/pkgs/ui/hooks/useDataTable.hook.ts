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
/* utils */
import { filterItemsBySearchableColumns } from './filter.util';
/* utilities */
import { subtractSets } from '@utilities/functions';

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

  const updateColumns = useCallback((newColumns: Column<T, K>[]) => {
    if (!newColumns.length) {
      return;
    }
    const newColumnsMap = new Map<K, Column<T, K>>();
    const newSearchableColumnsSet = new Set<K>();

    for (const newColumn of newColumns) {
      newColumnsMap.set(newColumn.key, newColumn);

      if (newColumn.searchable) {
        newSearchableColumnsSet.add(newColumn.key);
      }
    }

    setColumnsMap(newColumnsMap);
    setSearchableColumnsSet(newSearchableColumnsSet);

    setHiddenColumnsSet(currentHiddenSet => {
      const newHiddenSet = new Set<K>();
      for (const newColumn of newColumns) {
        if (currentHiddenSet.has(newColumn.key) && newColumn.hidable) {
          newHiddenSet.add(newColumn.key);
        }
      }
      return newHiddenSet;
    });
  }, []);
  const appendColumns = useCallback((newColumns: Column<T, K>[]) => {
    if (!newColumns.length) return;

    setColumnsMap(prevMap => {
      const updatedMap = new Map(prevMap);
      for (const col of newColumns) {
        updatedMap.set(col.key, col);
      }
      return updatedMap;
    });

    setSearchableColumnsSet(prevSet => {
      const updatedSet = new Set(prevSet);
      for (const col of newColumns) {
        if (col.searchable) {
          updatedSet.add(col.key);
        }
      }
      return updatedSet;
    });
  }, []);

  const hideColumn = useCallback(
    (newHiddenColumn: K) => {
      if (
        !columnsMap.has(newHiddenColumn) ||
        !columnsMap.get(newHiddenColumn)?.hidable ||
        hiddenColumnsSet.has(newHiddenColumn)
      ) {
        return;
      }
      const newHiddenColumnsSet = new Set<K>(hiddenColumnsSet);
      newHiddenColumnsSet.add(newHiddenColumn);
      setHiddenColumnsSet(newHiddenColumnsSet);
    },
    [columnsMap, hiddenColumnsSet]
  );
  function showColumn(hiddenColumn: K) {
    if (!hiddenColumnsSet.has(hiddenColumn)) {
      return;
    }
    const newHiddenColumnsSet = new Set<K>(hiddenColumnsSet);
    newHiddenColumnsSet.delete(hiddenColumn);
    setHiddenColumnsSet(newHiddenColumnsSet);
  }

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
    const shouldFilterItems =
      subtractedSearchableColumnsSet.size > 0 && validSearchParam.length > 0;

    const filteredItems = shouldFilterItems
      ? filterItemsBySearchableColumns({
          items: rawData,
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
      for (let rowIndex = 0; rowIndex < filteredItems.length; rowIndex++) {
        const filteredItem = filteredItems[rowIndex];

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
