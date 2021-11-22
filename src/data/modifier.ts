import { IObject } from "./types";

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
  type: EModifierType;
  effects: EModifierEffect;
};

export type Modifiers = Record<EModifierType, Record<EModifierEffect, Record<number, IModifier>>>;