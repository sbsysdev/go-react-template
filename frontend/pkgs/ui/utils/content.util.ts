import type { Slot, SlotNode, ThemeScheme } from '@ui/types';

export function content<T = undefined>(
  component: Slot<T>,
  ...args: [T] extends [undefined] ? [] : [params: T]
) {
  const params = args[0];

  if (typeof component === 'function') {
    return component(params!);
  }

  return component satisfies SlotNode;
}

export function inverseScheme(scheme: ThemeScheme): ThemeScheme {
  if (scheme === 'dark') {
    return 'light';
  }
  return 'dark';
}
