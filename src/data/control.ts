import { reset } from "../config/reset";
import { EModifierEffect, EModifierType, Modifiers } from "./modifier";
import { IProduction } from "./production";
import { IResearch } from "./research";
import { EStorageCategory, getFree, IStorage } from "./storage";
import { IGetItem, IItem } from "./types";

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

  // getItems(getAmounts: boolean): IGetItem[];
  getItems(getAmounts: true, filter: number): IGetItem[];
  getItems(getAmounts: false, filter: number): IItem[];
  getItems(getAmounts: boolean, filter: number): IItem[] {
    return Object.values(this.items).filter((item) => (filter & item.storageCategory) > 0).map((item) => (
      {
        ...item,
        ...(getAmounts ? {
          current: this.storage[item.storageCategory].stored[item.id] ?? 0,
          ...(this.storage[item.storageCategory].reserved[item.id] ? {max: this.storage[item.storageCategory].reserved[item.id]} : {})
        }: {})
      }));
  }

  getItem(key: number) {
    return this.items[key];
  }

  getStore(key: EStorageCategory) {
    return {
      ...this.storage[key],
      used: this.storage[key].available - getFree(this.storage[key])
    };
  }

  reset() {
    const {storage, production, modifier, purchasedResearch} = reset();
    this.storage = storage;
    this.production = production;
    this.modifier = modifier;
    this.purchasedResearch = purchasedResearch;
  }
};
