
enum EStorageCategory {
  BULK = 0,
  MANUFACTURED = 1,
  COOLED = 2,
  LIQUID = 3,
};

interface IStorage extends IObject {
  // available space
  available: number;
  // segments - must be less than or equal to available 
  reserved: Record<number, number>;
  // accepted items
  accepted: EStorageCategory;
};

// storage functions
// returns false if the operation is illegal
const tryReserve = (store: IStorage, key: number, value: number): boolean => {
  throw Error("Not implemented");
};

// returns input if the operation is illegal
// fill Available shall only work on positive operations
const tryModify = (store: IStorage, key: number, value: number, fillAvailable: boolean): number => {
  throw Error("Not implemented");
};