/* react */
import { useMemo, useState } from 'react';
/* types */
import type { Column, DataTableProps, SortBy } from '@ui/types';

export function useDataTable<T>({
  perPage: defaultPerPage = 0,
  currentPage: defaultCurrentPage = 0,
  search: defaultSearch = '',
  sortKey: defaultSortKey = null,
  sortBy: defaultSortBy = 'ASC',
  rowCounter: defaultRowCounter = 'page',
  hidden: defaultHidden = [],
}: DataTableProps<T>) {
  /* states */
  const [rows, setRows] = useState<T[]>([]);
  const [columns, setColumns] = useState<Column<T>[]>([]);

  const [perPage, setPerPage] = useState(() => (defaultPerPage > 0 ? defaultPerPage : 0));
  const [currentPage, setCurrentPage] = useState(() =>
    defaultCurrentPage > 0 ? defaultCurrentPage : 0
  );

  const [search, setSearch] = useState(() => defaultSearch);

  const [sortKey, setSortKey] = useState(() => defaultSortKey);
  const [sortBy, setSortBy] = useState(() => defaultSortBy);

  const [rowCounter, setRowCounter] = useState(() => defaultRowCounter);

  const [hidden, setHidden] = useState(() => {
    const hiddenSet = new Set<keyof T>();
    for (const hiddenKey of defaultHidden) {
      hiddenSet.add(hiddenKey);
    }
    return hiddenSet;
  });

  /* update states */

  function updateRow(newRows: T[]) {
    setRows(newRows);
  }

  function updateColumns(newColumns: Column<T>[]) {
    setColumns(newColumns);
  }

  function updateSort(newSortKey: keyof T, newSortBy: SortBy) {
    setSortKey(newSortKey);
    setSortBy(newSortBy);
  }
  function cleanSort() {
    setSortKey(null);
  }

  /* reactivity */
  const filteredRows = useMemo(() => [], []);

  return { updateRow, updateColumns, updateSort, cleanSort, filteredRows };
}
