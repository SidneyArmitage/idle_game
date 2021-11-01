interface IObject {
  description: string;
  name: string;
  // ID shall be used to identify this in the master map
  id: number;
  // Path to SVG resource (to be added later in process)
  icon: "";
}

interface IItem extends IObject {
  storageCategory: EStorageCategory;
  name: string;
};

interface IProduction extends IObject {
  // the number of production buildings of this type
  amount: number;
  // reserved
  required: [number, number][];
  // must be the remainder of what is required
  reserved: [number, number][];
  // consumption - must be a subset of requred
  consumption: [number, number][];
  // output
  output: [number, number][];
  // time
  time: number;
  name: string;
};

enum EModifierType {
  FOCUSED,
  GOODS,
  CATEGORIES,
};

enum EModifierEffect {
  REQUIRED,
  CONSUMPTION,
  OUTPUT,
  STORAGE,
  TIME,
}

interface IModifier extends IObject {
  value: number;
  type: EModifierType;
  effects: EModifierEffect;
  items: number[];
};


enum EStorageCategory {
  BULK = 0,
  MANUFACTURED = 1,
  COOLED = 2,
  LIQUID = 3,
};

enum EProductionCategory {
  EXTRACT = 1,
  GROW = 2,
  AVAILABLE = 4,
};

interface IStorage extends IObject {
  // available space
  available: number;
  // segments - must be less than or equal to available 
  reserved: Record<number, number>;
  used: Record<number, number>;
  // accepted items
  accepted: EStorageCategory;
};

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