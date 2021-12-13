import { EStorageCategory, IItem } from "shared";

interface IItemBaseAge {
  time: number;
  value: number;
  output: string;
}

interface IOverride {
  name?: string;
}

interface IEpoch {
  value: number;
  wood: IOverride;
  burn: IOverride;
}

interface ITier {
  value: number;
  burn: string[];
  tool: string[];
  luxury: IOverride;
  overrides: Record<string, IOverride>;
  resource: string;
}

export const createItem = (name: string, nextId: number, description: string, storageCategory: EStorageCategory, icon: ""): IItem => ({
  name,
  storageCategory,
  id: nextId,
  description: description.replace(/\{\{name\}\}/g, name),
  icon: icon,
});

export const createTierItems = (tier: ITier, epoch: IEpoch, baseItems: string[]): IItem[] => {
  // return baseItems.map(() => {

  // });
  return [];
}

export default (age: Record<string, IItemBaseAge>, epoch: Record<string, IEpoch>, tier: Record<string, ITier>) => {

};
