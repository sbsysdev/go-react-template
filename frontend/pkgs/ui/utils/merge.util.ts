/* types */
import type { MergeString } from '@ui/types';

export function mergeString({ join: joinValue, values = [] }: MergeString): string {
  return values.filter(Boolean).join(joinValue);
}

export function classNames(...names: (false | null | undefined | string)[]): string {
  return mergeString({ values: names, join: ' ' });
}
