import { EStorageCategory, IItem, IProduction } from "shared";
import generateItems from "./items";
import generateProduction from "./production";

export interface IEntityBase {
  time: number;
  value: number;
  output: [string, number][];
  input: [string, number][];
  storageCategory: EStorageCategory;
  itemDescription: string;
  producerDescription: string;
  itemName: string;
  producerName: string;
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

export interface IResources {
  items: IItem[];
  production: IProduction[];
}

export default (tier: Record<string, ITier>, tierItems: Record<string, IEntityBase>, epoch: Record<string, IEpoch>, epochItems: Record<string, IEntityBase>): IResources => {
  const items = generateItems(tier, tierItems, epoch, epochItems);
  return {
    items,
    production: generateProduction(tier, tierItems, epoch, epochItems, {}),
  }
}

export const items = generateItems;