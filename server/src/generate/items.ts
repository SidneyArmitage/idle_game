import { EStorageCategory, IItem } from "shared";
import { ITier, IEntityBase, IEpoch } from ".";

export const createItem = (name: string, id: number, description: string, storageCategory: EStorageCategory, icon: ""): IItem => ({
  name,
  storageCategory,
  id,
  description: description.replace(/\{\{this\}\}/g, name),
  icon,
});

export const createTierItems = (tier: ITier, baseItems: Record<string, IEntityBase>, nextId: number): [number, IItem[]] => {
  const out = Object.keys(baseItems).map((key) => createItem(
    tier.overrides[key]?.itemName ?? `${tier.resource}`, 
    nextId++,
    tier.overrides[key]?.itemDescription ?? baseItems[key].itemDescription,
    tier.overrides[key]?.storageCategory ?? baseItems[key].storageCategory, 
    ""));
  return [nextId, out];
};

export const createEpochItems = (epoch: IEpoch, baseItems: Record<string, IEntityBase>, nextId: number ): [number, IItem[]] => {
  const out = Object.keys(baseItems).map((key) => {
    return createItem(
      epoch.overrides[key]?.itemName ?? key, 
      nextId++,
      epoch.overrides[key]?.itemDescription ?? baseItems[key].itemDescription,
      epoch.overrides[key]?.storageCategory ?? baseItems[key].storageCategory, 
      "")
    });
  return [nextId, out];
};

export default (tier: Record<string, ITier>, tierItems: Record<string, IEntityBase>, epoch: Record<string, IEpoch>, epochItems: Record<string, IEntityBase>): IItem[] => {
  let id = 0;
  return [
    ...Object.values(epoch).reduce((acc, e) => {
      const out = createEpochItems(e, epochItems, id);
      id = out[0];
      return [...acc, ...out[1]];
    }, [] as IItem[]),
    ...Object.values(tier).reduce((acc, t) => {
      const out = createTierItems(t, tierItems, id);
      id = out[0];
      return [...acc, ...out[1]];
    }, [] as IItem[]),
];
};
