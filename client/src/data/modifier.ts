import { IObject } from "shared";

// this defines the heirachy that these operate in, Cat < Focused < GOODS
export enum EModifierType {
  CATEGORIES,
  FOCUSED, // contains the id of the object it effects e.g. production
  GOODS,
};

export enum EModifierEffect {
  CONSUMPTION,
  OUTPUT,
  REQUIRED,
  STORAGE,
  TIME,
};

// modifiers can be upgraded
export interface IModifier extends IObject {
  value: (base: number) => number;
};

export type Modifiers = Record<EModifierEffect, Record<EModifierType, Record<number, IModifier>>>;

export const initModifiers = (): Modifiers => ({
  [EModifierEffect.CONSUMPTION]: {
    [EModifierType.CATEGORIES]: {},
    [EModifierType.FOCUSED]: {},
    [EModifierType.GOODS]: {},
  },
  [EModifierEffect.OUTPUT]: {
    [EModifierType.CATEGORIES]: {},
    [EModifierType.FOCUSED]: {},
    [EModifierType.GOODS]: {},
  },
  [EModifierEffect.REQUIRED]: {
    [EModifierType.CATEGORIES]: {},
    [EModifierType.FOCUSED]: {},
    [EModifierType.GOODS]: {},
  },
  [EModifierEffect.TIME]: {
    [EModifierType.CATEGORIES]: {},
    [EModifierType.FOCUSED]: {},
    [EModifierType.GOODS]: {},
  },
  [EModifierEffect.STORAGE]: {
    [EModifierType.CATEGORIES]: {},
    [EModifierType.FOCUSED]: {},
    [EModifierType.GOODS]: {},
  },
});