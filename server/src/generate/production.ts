import { IProduction } from "shared";
import { IItemBase, ITier } from ".";

export const createProducer = (name: string, id: number, description: string, icon: "", output: [number, number][], item: string, consumption: [number, number][] = []): IProduction => ({
  id,
  description: description.replace(/\{\{this\}\}/g, name).replace(/\{\{item\}\}/g, item),
  icon,
  name,
  amount: 0,
  consumption,
  output,
  time: 0,
  progress: 0,
});

export const createTierProducers = (tier: ITier, baseItems: Record<string, IItemBase>, nextId: number) => {
  const out = Object.keys(baseItems).map((key) => createProducer(
    tier.overrides[key]?.producerName ?? `${tier.resource} ${key}`, 
    nextId++,
    tier.overrides[key]?.producerDescription ?? baseItems[key].producerDescription, 
    "",
    [],
    tier.overrides[key]?.itemName ?? `${tier.resource}`
  ));
  return [nextId, out];
};