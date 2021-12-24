import { IProduction } from "shared";
import { IEntityBase, IEpoch, ITier } from ".";

export const createProducer = (name: string, id: number, description: string, icon: "", output: [string, number][], item: string, consumption: [string, number][], time: number, resource: string, itemMap: Record<string, number>): IProduction => ({
  id,
  description: description.replace(/\{\{this\}\}/g, name).replace(/\{\{item\}\}/g, item),
  icon,
  name,
  amount: 0,
  consumption: consumption.map(([key, value]) => ([itemMap[key.replace(/\{\{item\}\}/g, item)] ?? itemMap[`${resource}-${key}`], value])),
  output: output.map(([key, value]) => ([itemMap[key.replace(/\{\{item\}\}/g, item)] ?? itemMap[`${resource}-${key}`], value])),
  time,
  progress: 0,
});

export const createTierProducers = (tier: ITier, baseEntities: Record<string, IEntityBase>, itemMap: Record<string, number>, nextId: number): [number, IProduction[]] => {
  const out = Object.keys(baseEntities).map((key) => {
    const item = getItemName(`${tier.resource}-${key}`, itemMap).split("-").pop() as string;
    return createProducer(
      (tier.overrides[key]?.producerName ?? baseEntities[key].producerName).replace(/\{\{resource\}\}/, tier.resource).replace(/\{\{item\}\}/, item),
      nextId++,
      tier.overrides[key]?.producerDescription ?? baseEntities[key].producerDescription,
      "",
      (tier.overrides[key]?.output ?? baseEntities[key].output.map((e) => (itemMap[e[0]] !== undefined || e[0] === "{{item}}" ? e : [
        `${tier.resource}-${e[0]}`,
        e[1],
      ]))),
      item,
      (tier.overrides[key]?.input ?? baseEntities[key].input.map((e) => (itemMap[e[0]] !== undefined || e[0] === "{{item}}" ? e : [
        `${tier.resource}-${e[0]}`,
        e[1],
      ]))),
      0,
      tier.resource,
      itemMap,
    )
  });
  return [nextId, out];
};

export const getItemName = (name: string, itemMap: Record<string, number>) => {
  const value = itemMap[name];
  for (const key of Object.keys(itemMap)) {
    if (itemMap[key] === value && name !== key) {
      return key;
    }
  }
  return name;
};

export const createEpochProducers = (epoch: IEpoch, baseEntities: Record<string, IEntityBase>, itemMap: Record<string, number>, nextId: number): [number, IProduction[]] => {
  const out = Object.keys(baseEntities).map((key) => {
    const item = getItemName(`${epoch.name}-${key}`, itemMap).split("-").pop() as string;
    return createProducer(
      (epoch.overrides[key]?.producerName ?? baseEntities[key].producerName).replace(/\{\{item\}\}/, item),
      nextId++,
      epoch.overrides[key]?.producerDescription ?? baseEntities[key].producerDescription,
      "",
      (epoch.overrides[key]?.output ?? baseEntities[key].output.map((e) => (itemMap[e[0]] || e[0] === "{{item}}" ? e : [
        `${epoch.name}-${e[0]}`,
        e[1],
      ]))),
      item,
      (epoch.overrides[key]?.input ?? baseEntities[key].input.map((e) => (itemMap[e[0]] || e[0] === "{{item}}" ? e : [
        `${epoch.name}-${e[0]}`,
        e[1],
      ]))),
      0,
      epoch.name,
      itemMap,
    )
  });
  return [nextId, out];
};

export default (tier: Record<string, ITier>, tierItems: Record<string, IEntityBase>, epoch: Record<string, IEpoch>, epochItems: Record<string, IEntityBase>, itemMap: Record<string, number>): IProduction[] => {
  let id = 0;
  return [
    ...Object.values(epoch).reduce((acc, e) => {
      const epochOut = createEpochProducers(e, epochItems, itemMap, id);
      id = epochOut[0];
      const localItemMap = {
        ...itemMap,
        ...Object.keys(epochItems).reduce((acc, cur) => ({
          ...acc,
          [`{{${cur}}}`]: itemMap[`${e.name}-burn`],
        }), {}),
      };
      return [...acc, ...epochOut[1], ...Object.values(tier).reduce((acc, t) => {
        const out = createTierProducers(t, tierItems, localItemMap, id);
        id = out[0];
        return [...acc, ...out[1]];
      }, [] as IProduction[]),];
    }, [] as IProduction[]),
  ];
}