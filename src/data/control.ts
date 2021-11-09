import { EModifierEffect, EModifierType, Modifiers } from "./modifier";
import { IProduction } from "./production";
import { EStorageCategory, IStorage } from "./storage";
import { IItem } from "./types";

interface IClassControlReset {
  modifier: Modifiers;
  storage: Record<EStorageCategory, IStorage>;
  production: [];
  purchasedResearch: [];
};

export class SimulationControl {
  private items: Record<number, IItem>; // static
  private storage: Record<EStorageCategory, IStorage>; // resets
  private production: IProduction[]; // resets
  // modifier is stored by type, what item it affects which is defined by type and then what effect it has
  private modifier: Modifiers; // resets
  private research: Record<number, IResearch>; // static
  private purchasedResearch: number[]; // resets
  private unlockedResearch: number[]; // changes
  private unlockableResearch: number[]; // changes

  constructor (items: Record<number, IItem>, {storage, production, modifier, purchasedResearch} = reset()){
    this.items = items;
    this.research = {};
    this.unlockedResearch = [];
    this.unlockableResearch = [];
    this.storage = storage;
    this.production = production;
    this.modifier = modifier;
    this.purchasedResearch = purchasedResearch;
  }

  step() {
    throw Error("Not implemented");
  }

  reset() {
    const {storage, production, modifier, purchasedResearch} = reset();
    this.storage = storage;
    this.production = production;
    this.modifier = modifier;
    this.purchasedResearch = purchasedResearch;
  }
};

export const reset = (): IClassControlReset => {
  return {
    storage: {
      [EStorageCategory.BULK]: {
        available: 100,
        description: "Bulk storage for resources with large quantity",
        name: "Bulk",
        icon: "",
        id: EStorageCategory.BULK,
        reserved: {},
        stored: {},
      },
      [EStorageCategory.MANUFACTURED]: {
        available: 100,
        description: "Storage for manufactured goods",
        icon: "",
        id: EStorageCategory.MANUFACTURED,
        name: "Manufactured",
        reserved: {},
        stored: {},
      },
      [EStorageCategory.EXOTIC]: {
        available: 100,
        description: "Storage for perishable or delicate goods",
        icon: "",
        id: EStorageCategory.EXOTIC,
        name: "Exotic",
        reserved: {},
        stored: {},
      },
      [EStorageCategory.POPULATION]: {
        available: 3,
        description: "Where the workers live",
        icon: "",
        id: EStorageCategory.POPULATION,
        name: "Housing",
        reserved: {},
        stored: {},
      },
    },
    modifier: {
      [EModifierType.CATEGORIES]: {},
      [EModifierType.FOCUSED]: {},
      [EModifierType.GOODS]: {},
    },
    production: [],
    purchasedResearch: [],
  };
}