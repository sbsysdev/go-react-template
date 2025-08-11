/* types */
import type { Column } from '@ui/types';

interface FilterItemsBySearchableColumnsParams<T, K extends string | number | symbol> {
  items: T[];
  columnsMap: Map<K, Column<T, K>>;
  searchableColumnsSet: Set<K>;
  searchParam: string;
}

export function filterItemsBySearchableColumns<T, K extends string | number | symbol>({
  items,
  columnsMap,
  searchableColumnsSet,
  searchParam,
}: FilterItemsBySearchableColumnsParams<T, K>): T[] {
  const filteredItems: T[] = [];

  const splittedSearchParams = searchParam.split(' ');

  for (const item of items) {
    const currentSearchParams = new Set<string>(splittedSearchParams);

    for (const searchableColumn of searchableColumnsSet) {
      if (!columnsMap.has(searchableColumn)) {
        continue;
      }
      const currentColumn = columnsMap.get(searchableColumn)!;

      for (const currentSearchParam of currentSearchParams) {
        if (
          !currentColumn
            .toString(item)
            .toLocaleLowerCase()
            .includes(currentSearchParam.toLocaleLowerCase())
        ) {
          continue;
        }
        currentSearchParams.delete(searchParam);
      }

      if (!currentSearchParams.size) {
        filteredItems.push(item);
        break;
      }
    }
  }

  return filteredItems;
}
