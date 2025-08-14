/* types */
import type { Column, SortBy } from '@ui/types';

interface SortListBySortableColumnParams<T, K extends string | number | symbol> {
  sortKey?: K;
  list: T[];
  columnsMap: Map<K, Column<T, K>>;
  sortBy: SortBy;
}

export function sortListBySortableColumn<T, K extends string | number | symbol>({
  sortKey,
  list,
  columnsMap,
  sortBy,
}: SortListBySortableColumnParams<T, K>): T[] {
  if (!sortKey || !columnsMap.has(sortKey)) {
    return list;
  }
  const column = columnsMap.get(sortKey)!;

  return [...list].sort((a, b) => {
    const aValue = column.toString(a).toLocaleLowerCase();
    const bValue = column.toString(b).toLocaleLowerCase();

    // Handle numeric comparison
    const aNumber = parseFloat(aValue);
    const bNumber = parseFloat(bValue);
    if (!isNaN(aNumber) && !isNaN(bNumber)) {
      return sortBy === 'ASC' ? aNumber - bNumber : bNumber - aNumber;
    }

    // Handle string comparison
    if (aValue < bValue) {
      return sortBy === 'ASC' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortBy === 'ASC' ? 1 : -1;
    }
    return 0;
  });
}
