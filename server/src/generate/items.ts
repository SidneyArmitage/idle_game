import { EStorageCategory, IItem } from "shared";
import { ITier, IEntityBase, IEpoch } from ".";

export const createItem = (name: string, id: number, description: string, storageCategory: EStorageCategory, icon: ""): IItem => ({
  name,
  storageCategory,
  id,
  description: description.replace(/\{\{this\}\}/g, name),
  icon,
});

export const createTierItems = (tier: ITier, baseItems: Record<string, IEntityBase>, nextId: number): [number, IItem[], Record<string, number>] => {
  let map = {};
  const out = Object.keys(baseItems).map((key) => {
    const name = (tier.overrides[key]?.itemName ?? baseItems[key].itemName).replace(/\{\{resource\}\}/g, tier.resource);
    const id = nextId++;
    map = {
      ...map,
      [name]: id,
      [`${tier.resource}-${key}`]: id,
    };
    return createItem(
    name, 
    id,
    tier.overrides[key]?.itemDescription ?? baseItems[key].itemDescription,
    tier.overrides[key]?.storageCategory ?? baseItems[key].storageCategory, 
    "");
  });
  return [nextId, out, map];
};

export const createEpochItems = (epoch: IEpoch, baseItems: Record<string, IEntityBase>, nextId: number ): [number, IItem[], Record<string, number>] => {
  let map = {};
  const out = Object.keys(baseItems).map((key) => {
    const name = epoch.overrides[key]?.itemName ?? baseItems[key].itemName;
    const id = nextId++;
    map = {
      ...map,
      [name]: id,
      [`${epoch.name}-${key}`]: id,
    };
    return createItem(
      name, 
      id,
      epoch.overrides[key]?.itemDescription ?? baseItems[key].itemDescription,
      epoch.overrides[key]?.storageCategory ?? baseItems[key].storageCategory, 
      "");
    });
  return [nextId, out, map];
};

export default (tier: Record<string, ITier>, tierItems: Record<string, IEntityBase>, epoch: Record<string, IEpoch>, epochItems: Record<string, IEntityBase>): [IItem[], Record<string, number>] => {
  let id = 0;
  let map = {};
  const items = [
    ...Object.values(epoch).reduce((acc, e) => {
      const out = createEpochItems(e, epochItems, id);
      id = out[0];
      map = {
        ...map,
        ...out[2],
      };
      return [...acc, ...out[1]];
    }, [] as IItem[]),
    ...Object.values(tier).reduce((acc, t) => {
      const out = createTierItems(t, tierItems, id);
      id = out[0];
      map = {
        ...map,
        ...out[2],
      };
      return [...acc, ...out[1]];
    }, [] as IItem[]),
]
  return [items, map];
};
