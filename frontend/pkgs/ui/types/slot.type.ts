import type { ReactNode } from 'react';

export type SlotNode = ReactNode | ReactNode[] | undefined;

export type Slot<T = undefined> = T extends object
  ? SlotNode | ((params: T) => SlotNode)
  : SlotNode | (() => SlotNode);
