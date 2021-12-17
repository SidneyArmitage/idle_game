
// On Prestige currency = money, options:
// * research (random from available tree)
// * buy more land
// * upgrade starting state

import { IObject } from "shared";

enum EResearchType {
  PRODUCTION,
  MODIFIER
};

export interface IResearch extends IObject {
  // resources required to unlock once made available through prestige
  required: [number, number];
  prerequisites: number[];
  type: EResearchType;
  enables: number[];
};