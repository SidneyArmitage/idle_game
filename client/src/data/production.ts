import { IProduction, IItem, EStorageCategory } from "shared";
import { strip } from "../util/round";
import { EModifierEffect, EModifierType, Modifiers } from "./modifier";
import { IStorage, tryStore } from "./storage";


const identityModifier = (base: number) => base;

export const getConsumption = (production: IProduction, modifiers: Modifiers, items: Record<number, IItem>): [number, number][] => {
  const focusedModifier = modifiers[EModifierEffect.CONSUMPTION][EModifierType.FOCUSED][production.id]?.value ?? identityModifier;
  return production.consumption.map((element) => {
    const item = items[element[0]];
    const itemModifier = modifiers[EModifierEffect.CONSUMPTION][EModifierType.CATEGORIES][item?.storageCategory]?.value ?? identityModifier;
    const goodsModifier = modifiers[EModifierEffect.CONSUMPTION][EModifierType.GOODS][item?.id]?.value ?? identityModifier;
    return [element[0], goodsModifier(focusedModifier(itemModifier(element[1]))) * production.amount];
  });
};

export const getOutput = (production: IProduction, modifiers: Modifiers, items: Record<number, IItem>): [number, number][] => {
  const focusedModifier = modifiers[EModifierEffect.OUTPUT][EModifierType.FOCUSED][production.id]?.value ?? identityModifier;
  return production.output.map((element) => {
    const item = items[element[0]];
    let itemModifier = identityModifier;
    let goodsModifier = identityModifier;

    if (item !== undefined) {
      itemModifier = modifiers[EModifierEffect.OUTPUT][EModifierType.CATEGORIES][item.storageCategory]?.value ?? identityModifier;
      goodsModifier = modifiers[EModifierEffect.OUTPUT][EModifierType.GOODS][item.id]?.value ?? identityModifier;
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
  let output = 0;
  if (list.length === 0) {
    output = production.time;
    output = (modifiers[EModifierEffect.TIME][EModifierType.FOCUSED][production.id]?.value ?? identityModifier)(output);
  } else {
    const inverseSize = 1 / list.reduce((acc, cur) => acc + cur[1], 0);
    output = list.reduce((acc, cur) => acc + inverseSize * (cur[1] * (modifiers[EModifierEffect.TIME][EModifierType.CATEGORIES][items[cur[0]].storageCategory]?.value ?? identityModifier)(production.time)), 0);
    output = (modifiers[EModifierEffect.TIME][EModifierType.FOCUSED][production.id]?.value ?? identityModifier)(output);
    output = list.reduce((acc, cur) => acc + inverseSize * (cur[1] * (modifiers[EModifierEffect.TIME][EModifierType.GOODS][cur[0]]?.value ?? identityModifier)(output)), 0);
  }
  return strip(output);
};

export const tryStartProduction = (production: IProduction, modifiers: Modifiers, items: Record<number, IItem>, storage: Record<EStorageCategory, IStorage>): boolean => {
  const consumption = getConsumption(production, modifiers, items);
  if (consumption.every(([id, count]) => (storage[items[id]?.storageCategory]?.stored[id] ?? Number.MIN_SAFE_INTEGER) >= count)) {
    consumption.forEach(([id, count]) => {
      tryStore(storage[items[id].storageCategory], id, -count);
    });
    return true;
  }
  return false;
};

// Step based production method
export const produce = (production: IProduction, modifiers: Modifiers, items: Record<number, IItem>, storage: Record<EStorageCategory, IStorage>, delta: number): void => {
  const time = getTime(production, modifiers, items);
  const initialProgress = production.progress;
  if(initialProgress === 0 && !tryStartProduction(production, modifiers, items, storage)) {
    return;
  }
  production.progress = Math.min(initialProgress + delta, time);
  if (initialProgress + delta >= time) {
    production.progress -= time;
    getOutput(production, modifiers, items).forEach(([key, value]) => {
      tryStore(storage[items[key].storageCategory], key, value);
    });
    if (initialProgress + delta > time) {
      return produce(production, modifiers, items, storage, delta - time + initialProgress);
    }
  }
  
};