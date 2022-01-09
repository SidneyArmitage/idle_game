import { EModifierEffect, EModifierType, initModifiers } from "./modifier";
import { getConsumption, getOutput, getTime, produce, tryStartProduction } from "./production";
import { IItem, IObject, EStorageCategory, IProduction } from "shared";
import { IStorage } from "./storage";

const fillObject = (): IObject => ({
  id: 0,
  name: "",
  description: "",
  icon: "",
});

describe("get consumption", () => {
  
  describe("no modifiers", () => {
    
    it("has no units (amount is 0)", () => {
      const modifiers = initModifiers();
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 0,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          ...fillObject(),
          id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers, items)).toStrictEqual([[1, 0]]);
    });

    it("has no inputs", () => {
      const modifiers = initModifiers();
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          ...fillObject(),
          id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers, items).length).toBe(0);
    });

    it("has one input", () => {
      const modifiers = initModifiers();
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          ...fillObject(),
          id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers, items)).toStrictEqual([[1, 10]]);
    });

    it("has 2 inputs", () => {
      const modifiers = initModifiers();
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [[1, 10], [2, 12]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          ...fillObject(),
          id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers, items)).toStrictEqual([[1, 10], [2, 12]]);
    });

  });

  describe("category modifier", () => {

    it("has no units (amount is 0)", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.CONSUMPTION][EModifierType.CATEGORIES][EStorageCategory.BULK] = {
        ...fillObject(),
        value: (base: number) => base + 10,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 0,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          ...fillObject(),
          id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers, items)).toStrictEqual([[1, 0]]);
    });

    it("has no inputs", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.CONSUMPTION][EModifierType.CATEGORIES][EStorageCategory.BULK] = {
        ...fillObject(),
        value: (base: number) => base + 10,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          ...fillObject(),
          id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers, items).length).toBe(0);
    });

    it("has one input", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.CONSUMPTION][EModifierType.CATEGORIES][EStorageCategory.BULK] = {
        ...fillObject(),
        value: (base: number) => base + 10,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          ...fillObject(),
          id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers, items)).toStrictEqual([[1, 20]]);
    });

    it("has 2 inputs", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.CONSUMPTION][EModifierType.CATEGORIES][EStorageCategory.BULK] = {
        ...fillObject(),
        value: (base: number) => base * 2,
      };
      modifiers[EModifierEffect.CONSUMPTION][EModifierType.CATEGORIES][EStorageCategory.MANUFACTURED] = {
        ...fillObject(),
        value: (base: number) => base * 3,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [[1, 10], [2, 12]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          ...fillObject(),
          id: 1,
          storageCategory: EStorageCategory.BULK,
        },
        2: {
          ...fillObject(),
          id: 1,
          storageCategory: EStorageCategory.MANUFACTURED,
        },
      };
      expect(getConsumption(production, modifiers, items)).toStrictEqual([[1, 20], [2, 36]]);
    });

  });

  describe("focused modifier", () => {

    it("has no units (amount is 0)", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.CONSUMPTION][EModifierType.FOCUSED][0] = {
        ...fillObject(),
        value: (base: number) => base + 10,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 0,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          ...fillObject(),
          id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers, items)).toStrictEqual([[1, 0]]);
    });

    it("has no inputs", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.CONSUMPTION][EModifierType.FOCUSED][0] = {
        ...fillObject(),
        value: (base: number) => base + 10,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          ...fillObject(),
          id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers, items).length).toBe(0);
    });

    it("has one input", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.CONSUMPTION][EModifierType.FOCUSED][0] = {
        ...fillObject(),
        value: (base: number) => base + 10,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          ...fillObject(),
          id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers, items)).toStrictEqual([[1, 20]]);
    });

    it("has 2 inputs", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.CONSUMPTION][EModifierType.FOCUSED][0] = {
        ...fillObject(),
        value: (base: number) => base * 2,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [[1, 10], [2, 12]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          ...fillObject(),
          id: 1,
          storageCategory: EStorageCategory.BULK,
        },
        2: {
          ...fillObject(),
          id: 2,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers, items)).toStrictEqual([[1, 20], [2, 24]]);
    });
    
    it("has focused and category", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.CONSUMPTION][EModifierType.FOCUSED][0] = {
        ...fillObject(),
        value: (base: number) => base + 10,
      };
      modifiers[EModifierEffect.CONSUMPTION][EModifierType.CATEGORIES][EStorageCategory.BULK] = {
        ...fillObject(),
        value: (base: number) => base * 2,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        output: [],
        consumption: [[1, 10]],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          ...fillObject(),
          id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers, items)).toStrictEqual([[1, 30]]);
    });

    it("has focused and goods", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.CONSUMPTION][EModifierType.FOCUSED][0] = {
        ...fillObject(),
        value: (base: number) => base + 10,
      };
      modifiers[EModifierEffect.CONSUMPTION][EModifierType.GOODS][1] = {
        ...fillObject(),
        value: (base: number) => base * 2,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        output: [],
        consumption: [[1, 10]],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          ...fillObject(),
          id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers, items)).toStrictEqual([[1, 40]]);
    });

  });

  describe("goods modifier", () => {

    it("has no units (amount is 0)", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.CONSUMPTION][EModifierType.GOODS][1] = {
        ...fillObject(),
        value: (base: number) => base + 10,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 0,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          ...fillObject(),
          id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers, items)).toStrictEqual([[1, 0]]);
    });

    it("has no inputs", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.CONSUMPTION][EModifierType.GOODS][1] = {
        ...fillObject(),
        value: (base: number) => base + 10,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          ...fillObject(),
          id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers, items).length).toBe(0);
    });

    it("has one input", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.CONSUMPTION][EModifierType.GOODS][1] = {
        ...fillObject(),
        value: (base: number) => base + 10,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          ...fillObject(),
          id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers, items)).toStrictEqual([[1, 20]]);
    });

    it("has 2 inputs", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.CONSUMPTION][EModifierType.GOODS][1] = {
        ...fillObject(),
        value: (base: number) => base * 2,
      };
      modifiers[EModifierEffect.CONSUMPTION][EModifierType.GOODS][2] = {
        ...fillObject(),
        value: (base: number) => base * 3,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [[1, 10], [2, 12]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          ...fillObject(),
          id: 1,
          storageCategory: EStorageCategory.BULK,
        },
        2: {
          ...fillObject(),
          id: 2,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers, items)).toStrictEqual([[1, 20], [2, 36]]);
    });

  });

});

describe("get output", () => {
  
  describe("no modifiers", () => {
    
    it("has no units (amount is 0)", () => {
      const modifiers = initModifiers();
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 0,
        output: [[1, 10]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          ...fillObject(),
          id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers, items)).toStrictEqual([[1, 0]]);
    });

    it("has no outputs", () => {
      const modifiers = initModifiers();
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          ...fillObject(),
          id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers, items).length).toBe(0);
    });

    it("has one output", () => {
      const modifiers = initModifiers();
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        output: [[1, 10]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          ...fillObject(),
          id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers, items)).toStrictEqual([[1, 10]]);
    });

    it("has 2 outputs", () => {
      const modifiers = initModifiers();
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        output: [[1, 10], [2, 12]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          ...fillObject(),
          id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers, items)).toStrictEqual([[1, 10], [2, 12]]);
    });

  });

  describe("category modifier", () => {

    it("has no units (amount is 0)", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.OUTPUT][EModifierType.CATEGORIES][EStorageCategory.BULK] = {
        ...fillObject(),
        value: (base: number) => base + 10,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 0,
        output: [[1, 10]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          ...fillObject(),
          id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers, items)).toStrictEqual([[1, 0]]);
    });

    it("has no outputs", () => {
      
      const modifiers = initModifiers();
      modifiers[EModifierEffect.OUTPUT][EModifierType.CATEGORIES][EStorageCategory.BULK] = {
        ...fillObject(),
        value: (base: number) => base + 10,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers, items).length).toBe(0);
    });

    it("has one output", () => {
      
      const modifiers = initModifiers();
      modifiers[EModifierEffect.OUTPUT][EModifierType.CATEGORIES][EStorageCategory.BULK] = {
        ...fillObject(),
        value: (base: number) => base + 10,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        output: [[1, 10]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers, items)).toStrictEqual([[1, 20]]);
    });

    it("has 2 outputs", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.OUTPUT][EModifierType.CATEGORIES][EStorageCategory.BULK] = {
        ...fillObject(),
        value: (base: number) => base * 2,
      };
      modifiers[EModifierEffect.OUTPUT][EModifierType.CATEGORIES][EStorageCategory.MANUFACTURED] = {
        ...fillObject(),
        value: (base: number) => base * 3,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        output: [[1, 10], [2, 12]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
        2: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.MANUFACTURED,
        },
      };
      expect(getOutput(production, modifiers, items)).toStrictEqual([[1, 20], [2, 36]]);
    });

  });

  describe("focused modifier", () => {

    it("has no units (amount is 0)", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.OUTPUT][EModifierType.FOCUSED][0] = {
        ...fillObject(),
        value: (base: number) => base + 10,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 0,
        output: [[1, 10]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers, items)).toStrictEqual([[1, 0]]);
    });

    it("has no outputs", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.OUTPUT][EModifierType.FOCUSED][0] = {
        ...fillObject(),
        value: (base: number) => base + 10,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers, items).length).toBe(0);
    });

    it("has one output", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.OUTPUT][EModifierType.FOCUSED][0] = {
        ...fillObject(),
        value: (base: number) => base + 10,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        output: [[1, 10]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers, items)).toStrictEqual([[1, 20]]);
    });

    it("has 2 outputs", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.OUTPUT][EModifierType.FOCUSED][0] = {
        ...fillObject(),
        value: (base: number) => base * 2,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        output: [[1, 10], [2, 12]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers, items)).toStrictEqual([[1, 20], [2, 24]]);
    });

    it("has focused and category", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.OUTPUT][EModifierType.FOCUSED][0] = {
        ...fillObject(),
        value: (base: number) => base * 3,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        output: [[1, 10]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers, items)).toStrictEqual([[1, 30]]);
    });

    it("has focused and goods", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.OUTPUT][EModifierType.FOCUSED][0] = {
        ...fillObject(),
        value: (base: number) => base + 10,
      };
      modifiers[EModifierEffect.OUTPUT][EModifierType.GOODS][1] = {
        ...fillObject(),
        value: (base: number) => base * 2,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        output: [[1, 10]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers, items)).toStrictEqual([[1, 40]]);
    });

  });

  describe("goods modifier", () => {

    it("has no units (amount is 0)", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.OUTPUT][EModifierType.GOODS][1] = {
        ...fillObject(),
        value: (base: number) => base + 10,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 0,
        output: [[1, 10]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers, items)).toStrictEqual([[1, 0]]);
    });

    it("has no outputs", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.OUTPUT][EModifierType.GOODS][1] = {
        ...fillObject(),
        value: (base: number) => base + 10,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers, items).length).toBe(0);
    });

    it("has one output", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.OUTPUT][EModifierType.GOODS][1] = {
        ...fillObject(),
        value: (base: number) => base + 10,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        output: [[1, 10]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers, items)).toStrictEqual([[1, 20]]);
    });

    it("has 2 outputs", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.OUTPUT][EModifierType.GOODS][1] = {
        ...fillObject(),
        value: (base: number) => base * 2,
      };
      modifiers[EModifierEffect.OUTPUT][EModifierType.GOODS][2] = {
        ...fillObject(),
        value: (base: number) => base * 3,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        output: [[1, 10], [2, 12]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
        2: {
        ...fillObject(),
        id: 2,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers, items)).toStrictEqual([[1, 20], [2, 36]]);
    });

  });

});


describe("get time", () => {
  
  describe("no modifiers", () => {
    
    it("has no units (amount is 0)", () => {
      const modifiers = initModifiers();
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 0,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers, items)).toBe(0);
    });
    
    it("has a unit", () => {
      const modifiers = initModifiers();
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers, items)).toBe(1);
    });

  });

  describe("category modifier", () => {

    it("has no units (amount is 0)", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.TIME][EModifierType.CATEGORIES][1] = {
        ...fillObject(),
        value: (base: number) => base * 0.9,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 0,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers, items)).toBe(0);
    });

    it("has no inputs", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.TIME][EModifierType.CATEGORIES][1] = {
        ...fillObject(),
        value: (base: number) => base * 0.9,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers, items)).toBe(1);
    });

    it("has one input", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.TIME][EModifierType.CATEGORIES][1] = {
        ...fillObject(),
        value: (base: number) => base * 0.9,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers, items)).toBe(0.9);
    });

    it("has 2 inputs", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.TIME][EModifierType.CATEGORIES][1] = {
        ...fillObject(),
        value: (base: number) => base * 2,
      };
      modifiers[EModifierEffect.TIME][EModifierType.CATEGORIES][2] = {
        ...fillObject(),
        value: (base: number) => base * 4,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [[1, 10], [2, 30]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
        2: {
        ...fillObject(),
        id: 2,
          storageCategory: EStorageCategory.MANUFACTURED,
        },
      };
      expect(getTime(production, modifiers, items)).toBe(3.5);
    });

  });

  describe("focused modifier", () => {

    it("has no units (amount is 0)", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.TIME][EModifierType.FOCUSED][0] = {
        ...fillObject(),
        value: (base: number) => base * 2,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 0,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers, items)).toBe(0);
    });

    it("has no inputs", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.TIME][EModifierType.FOCUSED][0] = {
        ...fillObject(),
        value: (base: number) => base * 2,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers, items)).toBe(2);
    });

    it("has one input", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.TIME][EModifierType.FOCUSED][0] = {
        ...fillObject(),
        value: (base: number) => base * 0.9,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers, items)).toBe(0.9);
    });

  });

  describe("goods modifier", () => {

    it("has no units (amount is 0)", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.TIME][EModifierType.GOODS][1] = {
        ...fillObject(),
        value: (base: number) => base * 0.5,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 0,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers, items)).toBe(0);
    });

    it("has no inputs", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.TIME][EModifierType.GOODS][1] = {
        ...fillObject(),
        value: (base: number) => base * 0.5,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers, items)).toBe(1);
    });

    it("has one input", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.TIME][EModifierType.GOODS][1] = {
        ...fillObject(),
        value: (base: number) => base * 0.5,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers, items)).toBe(0.5);
    });

    it("has 2 inputs", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.TIME][EModifierType.GOODS][1] = {
        ...fillObject(),
        value: (base: number) => base * 0.5,
      };
      modifiers[EModifierEffect.TIME][EModifierType.GOODS][2] = {
        ...fillObject(),
        value: (base: number) => base * 1,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [[1, 10], [2, 30]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
        2: {
        ...fillObject(),
        id: 2,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers, items)).toBe(0.875);
    });

  });

  describe("multiple modifiers", () => {

    it("compounds category & focused", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.TIME][EModifierType.CATEGORIES][EStorageCategory.BULK] = {
        ...fillObject(),
        value: (base: number) => base * 0.5
      };
      modifiers[EModifierEffect.TIME][EModifierType.FOCUSED][0] = {
        ...fillObject(),
        value: (base: number) => base * 0.5,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers, items)).toBe(0.25);
    });

    it("compounds focused & goods", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.TIME][EModifierType.GOODS][1] = {
        ...fillObject(),
        value: (base: number) => base * 0.5
      };
      modifiers[EModifierEffect.TIME][EModifierType.FOCUSED][0] = {
        ...fillObject(),
        value: (base: number) => base * 0.5,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers, items)).toBe(0.25);
    });

    it("compounds category & goods", () => {
      const modifiers = initModifiers();
      modifiers[EModifierEffect.TIME][EModifierType.CATEGORIES][EStorageCategory.BULK] = {
        ...fillObject(),
        value: (base: number) => base * 0.5
      };
      modifiers[EModifierEffect.TIME][EModifierType.GOODS][1] = {
        ...fillObject(),
        value: (base: number) => base * 0.5,
      };
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers, items)).toBe(0.25);
    });
  });

});

describe("try start production", () => {
  
  describe("it can produce", () => {

    it("amount is equal", () => {
      const modifiers = initModifiers();
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [[1, 10]],
        output: [[2, 5]],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
        2: {
        ...fillObject(),
        id: 2,
          storageCategory: EStorageCategory.MANUFACTURED,
        },
      };
      const storage: unknown = {
        [EStorageCategory.BULK]: {
          ...fillObject(),
          id: EStorageCategory.BULK,
          available: 1000,
          stored: {1: 10},
          reserved: {},
        },
        [EStorageCategory.MANUFACTURED]: {
          ...fillObject(),
          id: EStorageCategory.MANUFACTURED,
          available: 1000,
          stored: {},
          reserved: {},
        },
      };
      expect(tryStartProduction(production, modifiers, items, storage as Record<EStorageCategory, IStorage>, 1)).toBe(true);
      expect((storage as Record<EStorageCategory, IStorage>)[EStorageCategory.BULK].stored[1]).toBe(0);
    });

    it("amount is less", () => {
      const modifiers = initModifiers();
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [[1, 10]],
        output: [[2, 5]],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
        2: {
        ...fillObject(),
        id: 2,
          storageCategory: EStorageCategory.MANUFACTURED,
        },
      };
      const storage: unknown = {
        [EStorageCategory.BULK]: {
          ...fillObject(),
          id: EStorageCategory.BULK,
          available: 1000,
          stored: {1: 11},
          reserved: {},
        },
        [EStorageCategory.MANUFACTURED]: {
          ...fillObject(),
          id: EStorageCategory.MANUFACTURED,
          available: 1000,
          stored: {},
          reserved: {},
        },
      };
      expect(tryStartProduction(production, modifiers, items, storage as Record<EStorageCategory, IStorage>, 1)).toBe(true);
      expect((storage as Record<EStorageCategory, IStorage>)[EStorageCategory.BULK].stored[1]).toBe(1);
    });
  });

  describe("it is unable to produce", () => {

    it("does not have enough resources", () => {
      const modifiers = initModifiers();
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [[1, 10]],
        output: [[2, 5]],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
        2: {
        ...fillObject(),
        id: 2,
          storageCategory: EStorageCategory.MANUFACTURED,
        },
      };
      const storage: unknown = {
        [EStorageCategory.BULK]: {
          ...fillObject(),
          id: EStorageCategory.BULK,
          available: 1000,
          stored: {1: 1},
          reserved: {},
        },
        [EStorageCategory.MANUFACTURED]: {
          ...fillObject(),
          id: EStorageCategory.MANUFACTURED,
          available: 1000,
          stored: {},
          reserved: {},
        },
      };
      expect(tryStartProduction(production, modifiers, items, storage as Record<EStorageCategory, IStorage>, 1)).toBe(false);
    });

    it("does not have enough resources and resource does not exist in storage", () => {
      const modifiers = initModifiers();
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [[1, 10]],
        output: [[2, 5]],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
        2: {
        ...fillObject(),
        id: 2,
          storageCategory: EStorageCategory.MANUFACTURED,
        },
      };
      const storage: unknown = {
        [EStorageCategory.BULK]: {
          ...fillObject(),
          id: EStorageCategory.BULK,
          available: 1000,
          stored: {},
          reserved: {},
        },
        [EStorageCategory.MANUFACTURED]: {
          ...fillObject(),
          id: EStorageCategory.MANUFACTURED,
          available: 1000,
          stored: {},
          reserved: {},
        },
      };
      expect(tryStartProduction(production, modifiers, items, storage as Record<EStorageCategory, IStorage>, 1)).toBe(false);
    });

    it("does not produce if time is 0", () => {
      
      const modifiers = initModifiers();
      const production: IProduction = {
        ...fillObject(),
        id: 0,
        amount: 1,
        consumption: [[1, 10]],
        output: [[2, 5]],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
        ...fillObject(),
        id: 1,
          storageCategory: EStorageCategory.BULK,
        },
        2: {
        ...fillObject(),
        id: 2,
          storageCategory: EStorageCategory.MANUFACTURED,
        },
      };
      const storage: unknown = {
        [EStorageCategory.BULK]: {
          ...fillObject(),
          id: EStorageCategory.BULK,
          available: 1000,
          stored: {1: 10},
          reserved: {},
        },
        [EStorageCategory.MANUFACTURED]: {
          ...fillObject(),
          id: EStorageCategory.MANUFACTURED,
          available: 1000,
          stored: {},
          reserved: {},
        },
      };
      expect(tryStartProduction(production, modifiers, items, storage as Record<EStorageCategory, IStorage>, 0)).toBe(false);
      expect((storage as Record<EStorageCategory, IStorage>)[EStorageCategory.BULK].stored[1]).toBe(10);
    });
  });

});

describe("produce", () => {

  it("increases time on tick", () => {
    const modifiers = initModifiers();
    const production: IProduction = {
      ...fillObject(),
      id: 0,
      amount: 1,
      consumption: [],
      output: [[1, 5]],
      time: 1,
      progress: 0.1,
    };
    const items: Record<number, IItem> = {
      1: {
      ...fillObject(),
      id: 1,
        storageCategory: EStorageCategory.BULK,
      },
    };
    const storage: unknown = {
      [EStorageCategory.BULK]: {
        ...fillObject(),
        id: EStorageCategory.BULK,
        available: 1000,
        stored: {},
        reserved: {},
      },
    };
    produce(production, modifiers, items, storage as Record<EStorageCategory, IStorage>, 0.1);
    expect(production.progress).toBe(0.2);
  });

  it("increases time on start and subtracts resources", () => {
    const modifiers = initModifiers();
    const production: IProduction = {
      ...fillObject(),
      id: 0,
      amount: 1,
      consumption: [[2, 1]],
      output: [[1, 5]],
      time: 1,
      progress: 0,
    };
    const items: Record<number, IItem> = {
      1: {
      ...fillObject(),
      id: 1,
        storageCategory: EStorageCategory.BULK,
      },
      2: {
      ...fillObject(),
      id: 2,
        storageCategory: EStorageCategory.MANUFACTURED,
      },
    };
    const storage: unknown = {
      [EStorageCategory.BULK]: {
        ...fillObject(),
        id: EStorageCategory.BULK,
        available: 1000,
        stored: {},
        reserved: {},
      },
      [EStorageCategory.MANUFACTURED]: {
        ...fillObject(),
        id: EStorageCategory.MANUFACTURED,
        available: 1000,
        stored: {2: 1},
        reserved: {},
      },
    };
    produce(production, modifiers, items, storage as Record<EStorageCategory, IStorage>, 0.1);
    expect(production.progress).toBe(0.1);
    expect((storage as Record<EStorageCategory, IStorage>)[EStorageCategory.MANUFACTURED].stored[2]).toBe(0);
  });

  it("increases time on finish and adds resources", () => {
    const modifiers = initModifiers();
    const production: IProduction = {
      ...fillObject(),
      id: 0,
      amount: 1,
      consumption: [],
      output: [[1, 5]],
      time: 1,
      progress: 0.5,
    };
    const items: Record<number, IItem> = {
      1: {
      ...fillObject(),
      id: 1,
        storageCategory: EStorageCategory.BULK,
      },
    };
    const storage: unknown = {
      [EStorageCategory.BULK]: {
        ...fillObject(),
        id: EStorageCategory.BULK,
        available: 1000,
        stored: {},
        reserved: {},
      },
    };
    produce(production, modifiers, items, storage as Record<EStorageCategory, IStorage>, 0.5);
    expect(production.progress).toBe(0);
    expect((storage as Record<EStorageCategory, IStorage>)[EStorageCategory.BULK].stored[1]).toBe(5);
  });

  it("increases time on overflow and outputs as well as restarts", () => {
    const modifiers = initModifiers();
    const production: IProduction = {
      ...fillObject(),
      id: 0,
      amount: 1,
      consumption: [[2, 1]],
      output: [[1, 5]],
      time: 1,
      progress: 0.5,
    };
    const items: Record<number, IItem> = {
      1: {
      ...fillObject(),
      id: 1,
        storageCategory: EStorageCategory.BULK,
      },
      2: {
      ...fillObject(),
      id: 2,
        storageCategory: EStorageCategory.MANUFACTURED,
      },
    };
    const storage: unknown = {
      [EStorageCategory.BULK]: {
        ...fillObject(),
        id: EStorageCategory.BULK,
        available: 1000,
        stored: {},
        reserved: {},
      },
      [EStorageCategory.MANUFACTURED]: {
        ...fillObject(),
        id: EStorageCategory.MANUFACTURED,
        available: 1000,
        stored: {2: 1},
        reserved: {},
      },
    };
    produce(production, modifiers, items, storage as Record<EStorageCategory, IStorage>, 1);
    expect(production.progress).toBe(0.5);
    expect((storage as Record<EStorageCategory, IStorage>)[EStorageCategory.BULK].stored[1]).toBe(5);
    expect((storage as Record<EStorageCategory, IStorage>)[EStorageCategory.MANUFACTURED].stored[2]).toBe(0);
  });

  it("stops on overflow if there arn`t enough resources", () => {
    const modifiers = initModifiers();
    const production: IProduction = {
      ...fillObject(),
      id: 0,
      amount: 1,
      consumption: [[2, 1]],
      output: [[1, 5]],
      time: 1,
      progress: 0.5,
    };
    const items: Record<number, IItem> = {
      1: {
      ...fillObject(),
      id: 1,
        storageCategory: EStorageCategory.BULK,
      },
      2: {
      ...fillObject(),
      id: 2,
        storageCategory: EStorageCategory.MANUFACTURED,
      },
    };
    const storage: unknown = {
      [EStorageCategory.BULK]: {
        ...fillObject(),
        id: EStorageCategory.BULK,
        available: 1000,
        stored: {},
        reserved: {},
      },
      [EStorageCategory.MANUFACTURED]: {
        ...fillObject(),
        id: EStorageCategory.MANUFACTURED,
        available: 1000,
        stored: {2: 1},
        reserved: {},
      },
    };
    produce(production, modifiers, items, storage as Record<EStorageCategory, IStorage>, 4);
    expect(production.progress).toBe(0);
    expect((storage as Record<EStorageCategory, IStorage>)[EStorageCategory.BULK].stored[1]).toBe(10);
    expect((storage as Record<EStorageCategory, IStorage>)[EStorageCategory.MANUFACTURED].stored[2]).toBe(0);
  });

});