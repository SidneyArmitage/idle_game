import { IItem, EStorageCategory, IProduction, IGetItem } from "shared";
import { reset } from "../config/reset";
import Subscribable from "../util/subscribable";
import { Modifiers } from "./modifier";
import { getConsumption, getOutput, getTime, produce } from "./production";
import { IResearch } from "./research";
import { getFree, IStorage } from "./storage";

export enum ESubscribables {
  PRODUCER,
  STORE,
}

export class SimulationControl {
  private items: Record<number, IItem>; // static
  private storage: Subscribable<Record<EStorageCategory, IStorage>>; // resets
  private producers: Subscribable<Record<number, IProduction>>; // changes (resets a bit)
  // modifier is stored by type, what item it affects which is defined by type and then what effect it has
  private modifier: Modifiers; // resets
  private research: Record<number, IResearch>; // static
  private purchasedResearch: number[]; // resets
  private unlockedResearch: number[]; // changes
  private unlockableResearch: number[]; // changes
  private isRunning: boolean;
  private last: number;

  constructor ({storage, modifier, purchasedResearch} = reset()){
    this.research = {};
    this.unlockedResearch = [];
    this.unlockableResearch = [];
    this.storage = new Subscribable(storage);
    this.items = {};
    this.producers = new Subscribable({});
    this.modifier = modifier;
    this.purchasedResearch = purchasedResearch;
    this.isRunning = false;
    this.last = 0;
  }

  init(items: Record<number, IItem>, production: Record<number, IProduction>) {
    this.items = items;
    this.producers.set(production);
  }

  step(delta: number) {
    const producers = this.getProducers();
    const storage = this.storage.get();
    producers.map(producer => produce(producer, this.modifier, this.items, storage, delta));
    this.producers.set(producers);
    this.storage.set(storage);
  }

  getSubscribable(id: ESubscribables) {
    switch(id) {
      case ESubscribables.PRODUCER:
        return this.producers;
        case ESubscribables.STORE:
          return this.storage;
      default:
        throw Error("Bad state");
    }
  }

  // getItems(getAmounts: boolean): IGetItem[];
  getItems(getAmounts: true, filter: number): IGetItem[];
  getItems(getAmounts: false, filter: number): IItem[];
  getItems(getAmounts: boolean, filter: number): IItem[] {
    const storage = this.storage.get();
    return Object.values(this.items).filter((item) => (filter & item.storageCategory) > 0).map((item) => (
      {
        ...item,
        ...(getAmounts ? {
          current: storage[item.storageCategory].stored[item.id] ?? 0,
          ...(storage[item.storageCategory].reserved[item.id] ? {max: storage[item.storageCategory].reserved[item.id]} : {})
        }: {})
      }));
  }

  getItem(key: number, getAmounts: true, free: number): IGetItem;
  getItem(key: number, getAmounts: true): IGetItem;
  getItem(key: number, getAmounts: false): IItem;
  getItem(key: number, getAmounts: boolean, free?: number): IItem {
    const item = this.items[key];
    if (getAmounts === false) {
      return item;
    }
    const storage = this.storage.get();
    const reserved = storage[item.storageCategory].reserved[item.id];
    return {
      ...item,
      ...(reserved ? {
        current: storage[item.storageCategory].stored[item.id] ?? 0,
        max: storage[item.storageCategory].reserved[item.id] ?? free,
      } : {
        current: storage[item.storageCategory].stored[item.id] ?? 0,}),
    };
  }

  getProducers() {
    const items = this.items;
    return Object.values(this.producers.get()).map((producer) => ({
      ...producer,
      time: getTime(producer, this.modifier, items),
      output: getOutput(producer, this.modifier, items),
      consumption: getConsumption(producer, this.modifier, items),
    }));
  }

  getProducer(key: number) {
    return this.producers.get()[key];
  }

  getStore(key: EStorageCategory) {
    const storage = this.storage.get();
    return {
      ...storage[key],
      used: storage[key].available - getFree(storage[key])
    };
  }

  reset() {
    const {storage, modifier, purchasedResearch} = reset();
    this.storage.set(storage);
    this.modifier = modifier;
    this.purchasedResearch = purchasedResearch;
  }

  start() {
    this.last = 0;
    this.isRunning = true;
    const animate = (time: number) => {
      this.step((time - this.last) / 1000);
      this.last = time;
      if (this.isRunning === true) {
        window.requestAnimationFrame(animate);
      }
    }
    window.requestAnimationFrame(animate);
  }

  stop() {
    this.isRunning = false;
  }

  getIsRunning() {
    return this.isRunning;
  }

  getLast() {
    return this.last;
  }

};
