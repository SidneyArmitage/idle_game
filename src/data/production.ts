import { Modifiers } from "./modifier";
import { EStorageCategory, IStorage } from "./storage";
import { IObject, IItem } from "./types";

enum EProductionCategory {
  EXTRACT = 1,
  GROW = 2,
  AVAILABLE = 4,
};

// we need both vertical and horizontal expansion
export interface IProduction extends IObject {
  // the number of production buildings of this type
  amount: number;
  // consumption - must be a subset of required
  consumption: [number, number][];
  // output
  output: [number, number][];
  // time
  time: number;
  progress: number;
  name: string;
};

export const getConsumption = (production: IProduction, modifiers: Modifiers, items: Record<number, IItem>) => {
  throw Error("Not implemented");
};

export const getOutput = (production: IProduction, modifiers: Modifiers, items: Record<number, IItem>) => {
  throw Error("Not implemented");
};

export const getTime = (production: IProduction, modifiers: Modifiers) => {
  throw Error("Not implemented");
};

export const tryStartProduction = (production: IProduction, modifiers: Modifiers, items: Record<number, IItem>, storage: Record<EStorageCategory, IStorage>): boolean => {
  throw Error("Not implemented");
};