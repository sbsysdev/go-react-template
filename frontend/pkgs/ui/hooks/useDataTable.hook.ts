/* react */
import { useCallback, useMemo, useState } from 'react';
/* types */
import type { Column, DataTable, SortBy } from '@ui/types';
/* utilities */
import { subtractSets } from '@utilities/functions';
/* utils */
import {
  filterListBySearchableColumns,
  paginateList,
  serializeListToDataTable,
  sortListBySortableColumn,
} from '@ui/utils';

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

  const sortColumn = useCallback((key: K, by: SortBy) => {
    setSortKey(key);
    setSortBy(by);
  }, []);
  const unsortColumn = useCallback(() => {
    setSortKey(undefined);
    setSortBy('ASC');
  }, []);

  const [paginate, setPaginate] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

  const validSearchParam = useMemo<string>(
    () => (searchParam.trim().length > 3 ? searchParam.trim() : ''),
    [searchParam]
  );

  const dataTable = useMemo<DataTable<T, K>>(() => {
    const subtractedSearchableColumnsSet = subtractSets(searchableColumnsSet, hiddenColumnsSet);

    const filteredRawData = filterListBySearchableColumns({
      list: rawData,
      columnsMap,
      searchableColumnsSet: subtractedSearchableColumnsSet,
      searchParam: validSearchParam,
    });

    const sortedRawData = sortListBySortableColumn({
      sortKey,
      list: filteredRawData,
      columnsMap,
      sortBy,
    });

    const {
      totalPage,
      safeCurrentPage,
      pageStartIndex,
      paginatedList: paginatedRawData,
    } = paginateList({
      paginate,
      currentPage,
      perPage,
      list: sortedRawData,
    });

    const { header, rows } = serializeListToDataTable({
      columnsMap,
      hiddenColumnsSet,
      currentPage: safeCurrentPage,
      perPage,
      sortKey,
      sortBy,
      searchParam: validSearchParam,
      sortColumn,
      hideColumn,
      list: paginatedRawData,
      pageStartIndex,
    });

    return {
      header,
      rows,
      totalPage,
      safeCurrentPage,
    };
  }, [
    searchableColumnsSet,
    hiddenColumnsSet,
    validSearchParam,
    rawData,
    columnsMap,
    sortKey,
    sortBy,
    paginate,
    currentPage,
    perPage,
    sortColumn,
    hideColumn,
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

    sortColumn,
    unsortColumn,

    setPaginate,
    setCurrentPage,
    setPerPage,

    dataTable,
  };
}
