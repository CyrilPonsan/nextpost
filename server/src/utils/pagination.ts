export function getOffset(page: number, limit: number) {
  return (page - 1) * limit;
}

export function getTotalPages(count: number, limit: number) {
  return count % limit === 0 ? count / limit : Math.trunc(count / limit) + 1;
}
