import { IObject } from "./types";

export enum EModifierType {
  CATEGORIES,
  FOCUSED,
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
  value: number;
  type: EModifierType;
  effects: EModifierEffect;
  items: number[];
};

export type Modifiers = Record<EModifierType, Record<number, Record<EModifierEffect, IModifier>>>;