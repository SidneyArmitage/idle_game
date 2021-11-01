
// On Prestige currency = money, options:
// * research (random from available tree)
// * buy more land
// * upgrade starting state

enum EResearchType {
  PRODUCTION,
  MODIFIER
};

interface IResearch extends IObject {
  // resources required to unlock once made available through prestige
  required: [number, number];
  prerequisites: number[];
  type: EResearchType;
  enables: number[];
};