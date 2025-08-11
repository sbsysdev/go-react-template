/* types */
import type { Column } from '@ui/types';

interface FilterListBySearchableColumnsParams<T, K extends string | number | symbol> {
  list: T[];
  columnsMap: Map<K, Column<T, K>>;
  searchableColumnsSet: Set<K>;
  searchParam: string;
}

export function filterListBySearchableColumns<T, K extends string | number | symbol>({
  list,
  columnsMap,
  searchableColumnsSet,
  searchParam,
}: FilterListBySearchableColumnsParams<T, K>): T[] {
  const filteredList: T[] = [];

  const searchParamList = searchParam.split(' ');

  for (const listItem of list) {
    const currentSearchParamList = new Set<string>(searchParamList);

    for (const columnKey of searchableColumnsSet) {
      if (!columnsMap.has(columnKey)) {
        continue;
      }
      const column = columnsMap.get(columnKey)!;

      for (const currentSearchParamListItem of currentSearchParamList) {
        if (
          !column
            .toString(listItem)
            .toLocaleLowerCase()
            .includes(currentSearchParamListItem.toLocaleLowerCase())
        ) {
          continue;
        }
        currentSearchParamList.delete(currentSearchParamListItem);
      }

      if (!currentSearchParamList.size) {
        filteredList.push(listItem);
        break;
      }
    }
  }

  return filteredList;
}
