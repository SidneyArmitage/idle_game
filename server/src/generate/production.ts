import { IProduction } from "shared";
import { IEntityBase, IEpoch, ITier } from ".";

export const createProducer = (name: string, id: number, description: string, icon: "", output: [string, number][], item: string, consumption: [string, number][], time: number, itemMap: Record<string, number>): IProduction => ({
  id,
  description: description.replace(/\{\{this\}\}/g, name).replace(/\{\{item\}\}/g, item),
  icon,
  name,
  amount: 0,
  consumption: consumption.map(([key, value]) => ([itemMap[key.replace(/\{\{item\}\}/g, item)], value])),
  output: output.map(([key, value]) => ([itemMap[key.replace(/\{\{item\}\}/g, item)], value])),
  time,
  progress: 0,
});

export const createTierProducers = (tier: ITier, baseEntities: Record<string, IEntityBase>, itemMap: Record<string, number>, nextId: number): [number, IProduction[]] => {
  const out = Object.keys(baseEntities).map((key) => createProducer(
    tier.overrides[key]?.producerName ?? `${tier.resource} ${key}`, 
    nextId++,
    tier.overrides[key]?.producerDescription ?? baseEntities[key].producerDescription, 
    "",
    (tier.overrides[key]?.output ?? baseEntities[key].output),
    tier.overrides[key]?.itemName ?? `${tier.resource}`,
    (tier.overrides[key]?.input ?? baseEntities[key].input),
    0,
    itemMap
  ));
  return [nextId, out];
};

export const createEpochProducers = (epoch: IEpoch, baseEntities: Record<string, IEntityBase>, itemMap: Record<string, number>, nextId: number): [number, IProduction[]] => {
  const out = Object.keys(baseEntities).map((key) => createProducer(
    epoch.overrides[key]?.producerName ?? key, 
    nextId++,
    epoch.overrides[key]?.producerDescription ?? baseEntities[key].producerDescription, 
    "",
    (epoch.overrides[key]?.output ?? baseEntities[key].output),
    epoch.overrides[key]?.itemName ?? key,
    (epoch.overrides[key]?.input ?? baseEntities[key].input),
    0,
    itemMap
  ));
  return [nextId, out];
};

export default (tier: Record<string, ITier>, tierItems: Record<string, IEntityBase>, epoch: Record<string, IEpoch>, epochItems: Record<string, IEntityBase>, itemMap: Record<string, number>): IProduction[] => {
  let id = 0;
  return [
    ...Object.values(epoch).reduce((acc, e) => {
      const out = createEpochProducers(e, epochItems, itemMap, id);
      id = out[0];
      return [...acc, ...out[1]];
    }, [] as IProduction[]),
    ...Object.values(tier).reduce((acc, t) => {
      const out = createTierProducers(t, tierItems, itemMap, id);
      id = out[0];
      return [...acc, ...out[1]];
    }, [] as IProduction[]),
  ];
}