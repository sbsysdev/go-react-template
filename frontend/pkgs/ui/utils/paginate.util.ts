interface PaginateListParams<T> {
  paginate: boolean;
  currentPage: number;
  perPage: number;
  list: T[];
}

export function paginateList<T>({ paginate, currentPage, perPage, list }: PaginateListParams<T>) {
  const totalPage = paginate ? Math.max(1, Math.ceil(list.length / perPage)) : 1;
  const safeCurrentPage = paginate ? Math.min(Math.max(1, currentPage), totalPage) : 1;
  const pageStartIndex = (safeCurrentPage - 1) * perPage;

  const paginatedList = paginate ? list.slice(pageStartIndex, pageStartIndex + perPage) : list;

  return {
    totalPage,
    safeCurrentPage,
    pageStartIndex,
    paginatedList,
  };
}
