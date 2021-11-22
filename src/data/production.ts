import { EModifierEffect, EModifierType, Modifiers } from "./modifier";
import { EStorageCategory, IStorage } from "./storage";
import { IObject, IItem } from "./types";

enum EProductionCategory {
  EXTRACT = 1,
  GROW = 2,
  AVAILABLE = 4,
};

// we need both vertical and horizontal expansion
// cannot output any inputs
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

const identityModifier = (base: number) => base;

export const getConsumption = (production: IProduction, modifiers: Modifiers, items: Record<number, IItem>): [number, number][] => {
  const focusedModifier = modifiers[EModifierType.FOCUSED][EModifierEffect.CONSUMPTION][0]?.value ?? identityModifier;
  return production.consumption.map((element) => {
    const item = items[element[0]];
    let itemModifier = identityModifier;
    let goodsModifier = identityModifier;

    if (item !== undefined) {
      itemModifier = modifiers[EModifierType.CATEGORIES][EModifierEffect.CONSUMPTION][item.storageCategory]?.value ?? identityModifier;
      goodsModifier = modifiers[EModifierType.GOODS][EModifierEffect.CONSUMPTION][item.id]?.value ?? identityModifier;
    }
    return [element[0], goodsModifier(focusedModifier(itemModifier(element[1]))) * production.amount];
  });
};

export const getOutput = (production: IProduction, modifiers: Modifiers, items: Record<number, IItem>) => {
  const focusedModifier = modifiers[EModifierType.FOCUSED][EModifierEffect.OUTPUT][0]?.value ?? identityModifier;
  return production.output.map((element) => {
    const item = items[element[0]];
    let itemModifier = identityModifier;
    let goodsModifier = identityModifier;

    if (item !== undefined) {
      itemModifier = modifiers[EModifierType.CATEGORIES][EModifierEffect.OUTPUT][item.storageCategory]?.value ?? identityModifier;
      goodsModifier = modifiers[EModifierType.GOODS][EModifierEffect.OUTPUT][item.id]?.value ?? identityModifier;
    }
    return [element[0], goodsModifier(focusedModifier(itemModifier(element[1]))) * production.amount];
  });
};

// when time is concerned, bulk and item specific are done by percentage
// averages are used.
export const getTime = (production: IProduction, modifiers: Modifiers, items: Record<number, IItem>): number => {
  if (production.amount === 0) {
    return 0;
  }
  const list = [...production.consumption, ...production.output];
  if (list.length === 0) {
    return production.time;
  }
  return list.reduce((acc, cur) => acc + (modifiers[EModifierType.CATEGORIES][EModifierEffect.TIME][cur[0]].value ?? identityModifier)(production.time), 0);
};

export const tryStartProduction = (production: IProduction, modifiers: Modifiers, items: Record<number, IItem>, storage: Record<EStorageCategory, IStorage>): boolean => {
  throw Error("Not implemented");
};