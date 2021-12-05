import { IObject } from "./types";

export enum EStorageCategory {
  BULK = 1,
  MANUFACTURED = 2,
  EXOTIC = 4,
  POPULATION = 8,
};

export interface IStorage extends IObject {
  // available space
  available: number;
  // segments - must be less than or equal to available 
  reserved: Record<number, number>;
  stored: Record<number, number>;
  // accepted items
  id: EStorageCategory;
};

export const getFree = (store: IStorage) => 
  store.available - 
      Object.values(store.reserved).reduce((acc, cur) => acc + cur, 0) - 
      Object.keys(store.stored).reduce((acc, cur: unknown) => acc + store.reserved[cur as number] ? 0 : store.stored[cur as number], 0);

// storage functions
// returns false if the operation is illegal
export const tryReserve = (store: IStorage, key: number, value: number): boolean => {
  const free = getFree(store);
  if ((value < store.stored[key]) || value < 0 || free < value - Math.max(store.reserved[key] ?? 0, store.stored[key] ?? 0)) {
    return false;
  }
  store.reserved[key] = value;
  return true;
};

// returns input if the operation is illegal
// fill Available shall only work on positive operations
export const tryStore = (store: IStorage, key: number, delta: number, fillAvailable: boolean = false): number => {
  let overflow = 0;
  let available = (store.reserved[key] ?? 0) - (store.stored[key] ?? 0);
  if (!store.reserved[key]) {
    available = getFree(store);
  }
  // for unreserved space
  if (((store.stored[key] ?? 0) + delta) < 0 || ((store.stored[key] ?? 0) + delta) > available) {
    if (fillAvailable === false) {
      return delta;
    }
    overflow = Math.min((store.stored[key] ?? 0) + delta, available);
  }
  store.stored[key] = (store.stored[key] ?? 0) + delta;
  return 0 + overflow;
};
