import { EStorageCategory, IItem } from "shared";
import { default as generateItems } from "./items";

export interface IEntityBase {
  time: number;
  value: number;
  output: [string, number][];
  input: [string, number][];
  storageCategory: EStorageCategory;
  itemDescription: string;
  producer: string;
  producerDescription: string;
}

export interface IOverride {
  itemName?: string;
  itemDescription?: string;
  output?: [string, number][];
  input?: [string, number][];
  storageCategory?: EStorageCategory;
  producerName?: string;
  producerDescription?: string;
}

export interface IEpoch {
  value: number;
  overrides: Record<string, IOverride>;
}

export interface ITier {
  value: number;
  burn: string[];
  tool: string[];
  luxury: IOverride;
  overrides: Record<string, IOverride>;
  resource: string;
}

export default (tier: Record<string, ITier>, tierItems: Record<string, IEntityBase>, epoch: Record<string, IEpoch>, epochItems: Record<string, IEntityBase>): {items: IItem[]} => {
  return {
    items: generateItems(tier, tierItems, epoch, epochItems),
  }
}

export const items = generateItems;