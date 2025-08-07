/* react */
import { useMemo, useState } from 'react';
/* types */
import type { Column, DataTableParams, SortBy } from '@ui/types';

export function useDataTable<T>({
  paginate: defaultPaginate = false,
  currentPage: defaultCurrentPage = 1,
  perPage: defaultPerPage = 10,
  search: defaultSearch = '',
  sortKey: defaultSortKey = null,
  sortBy: defaultSortBy = 'ASC',
}: DataTableParams<T>) {
  /* rows */
  const [rows, updateRows] = useState<T[]>([]);

  /* columns */
  const [columns, updateColumns] = useState<Column<T>[]>([]);

  function removeColumnByIndex(columnIndex: number) {
    if (columnIndex < 0 || columnIndex > columns.length - 1) {
      throw new Error('"columnIndex" must be a valid index into columns');
    }
    const currentColumns = [...columns];
    currentColumns.splice(columnIndex, 1);
    return updateColumns(currentColumns);
  }

  /* search */
  const [search, setSearch] = useState(() => defaultSearch);

  const [sortKey, setSortKey] = useState(() => defaultSortKey);
  const [sortBy, setSortBy] = useState(() => defaultSortBy);

  const [paginate, setPaginate] = useState(() => defaultPaginate);
  const [perPage, setPerPage] = useState(() => (defaultPerPage > 0 ? defaultPerPage : 0));
  const [currentPage, setCurrentPage] = useState(() =>
    defaultCurrentPage > 0 ? defaultCurrentPage : 0
  );

  function updateSort(newSortKey: keyof T, newSortBy: SortBy) {
    setSortKey(newSortKey);
    setSortBy(newSortBy);
  }
  function cleanSort() {
    setSortKey(null);
  }

  /* reactivity */
  const processed = useMemo(() => {
    return {
      header: [],
      rows: [],
      currentPage,
      perPage,
      totalPages: 1,
      canGoBack: false,
      canGoForward: true,
    };
  }, [currentPage, perPage]);

  function updateCurrentPage(page: number) {
    if (page <= 1) {
      return setCurrentPage(1);
    }
    if (page >= processed.totalPages) {
      return setCurrentPage(processed.totalPages);
    }
    setCurrentPage(page);
  }

  function prevPage() {
    updateCurrentPage(currentPage - 1);
  }

  function nextPage() {
    updateCurrentPage(currentPage + 1);
  }

  return {
    rows,
    updateRows,
    columns,
    updateColumns,
    removeColumnByIndex,

    updateSort,
    cleanSort,

    processed,

    updateCurrentPage,
    prevPage,
    nextPage,
  };
}
