
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
};

interface IModifier extends IObject {
  value: number;
  type: EModifierType;
  effects: EModifierEffect;
  items: number[];
};