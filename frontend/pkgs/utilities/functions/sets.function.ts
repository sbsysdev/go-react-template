export function subtractSets<T>(minuendSet: Set<T>, subtrahendSet: Set<T>): Set<T> {
  if (!minuendSet.size || !subtrahendSet.size) {
    return minuendSet;
  }
  const differenceSet = new Set<T>(minuendSet);
  for (const item of subtrahendSet) {
    differenceSet.delete(item);
  }
  return differenceSet;
}
