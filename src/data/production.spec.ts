import { EModifierEffect, EModifierType, initModifiers } from "./modifier";
import { getConsumption, getOutput, getTime, IProduction, testStartProduction } from "./production";
import { EStorageCategory, IStorage } from "./storage";
import { IItem, IObject } from "./types";

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
      modifiers[EModifierType.CATEGORIES][EModifierEffect.CONSUMPTION][EStorageCategory.BULK] = {
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
      modifiers[EModifierType.CATEGORIES][EModifierEffect.CONSUMPTION][EStorageCategory.BULK] = {
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
      modifiers[EModifierType.CATEGORIES][EModifierEffect.CONSUMPTION][EStorageCategory.BULK] = {
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
      modifiers[EModifierType.CATEGORIES][EModifierEffect.CONSUMPTION][EStorageCategory.BULK] = {
        ...fillObject(),
        value: (base: number) => base * 2,
      };
      modifiers[EModifierType.CATEGORIES][EModifierEffect.CONSUMPTION][EStorageCategory.MANUFACTURED] = {
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
      modifiers[EModifierType.FOCUSED][EModifierEffect.CONSUMPTION][0] = {
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
      modifiers[EModifierType.FOCUSED][EModifierEffect.CONSUMPTION][0] = {
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
      modifiers[EModifierType.FOCUSED][EModifierEffect.CONSUMPTION][0] = {
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
      modifiers[EModifierType.FOCUSED][EModifierEffect.CONSUMPTION][0] = {
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
      modifiers[EModifierType.FOCUSED][EModifierEffect.CONSUMPTION][0] = {
        ...fillObject(),
        value: (base: number) => base + 10,
      };
      modifiers[EModifierType.CATEGORIES][EModifierEffect.CONSUMPTION][EStorageCategory.BULK] = {
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
      modifiers[EModifierType.FOCUSED][EModifierEffect.CONSUMPTION][0] = {
        ...fillObject(),
        value: (base: number) => base + 10,
      };
      modifiers[EModifierType.GOODS][EModifierEffect.CONSUMPTION][1] = {
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
      modifiers[EModifierType.GOODS][EModifierEffect.CONSUMPTION][1] = {
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
      modifiers[EModifierType.GOODS][EModifierEffect.CONSUMPTION][1] = {
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
      modifiers[EModifierType.GOODS][EModifierEffect.CONSUMPTION][1] = {
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
      modifiers[EModifierType.GOODS][EModifierEffect.CONSUMPTION][1] = {
        ...fillObject(),
        value: (base: number) => base * 2,
      };
      modifiers[EModifierType.GOODS][EModifierEffect.CONSUMPTION][2] = {
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
          description: "",
          icon: "",
          id: EStorageCategory.BULK,
          available: 1000,
          name: "",
          stored: {1: 10},
          reserved: {},
        },
        [EStorageCategory.MANUFACTURED]: {
          description: "",
          icon: "",
          id: EStorageCategory.MANUFACTURED,
          available: 1000,
          name: "",
          stored: {},
          reserved: {},
        },
      };
      expect(testStartProduction(production, modifiers, items, storage as Record<EStorageCategory, IStorage>)).toBe(true);
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
          description: "",
          icon: "",
          id: EStorageCategory.BULK,
          available: 1000,
          name: "",
          stored: {1: 11},
          reserved: {},
        },
        [EStorageCategory.MANUFACTURED]: {
          description: "",
          icon: "",
          id: EStorageCategory.MANUFACTURED,
          available: 1000,
          name: "",
          stored: {},
          reserved: {},
        },
      };
      expect(testStartProduction(production, modifiers, items, storage as Record<EStorageCategory, IStorage>)).toBe(true);
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
          description: "",
          icon: "",
          id: EStorageCategory.BULK,
          available: 1000,
          name: "",
          stored: {1: 10},
          reserved: {},
        },
        [EStorageCategory.MANUFACTURED]: {
          description: "",
          icon: "",
          id: EStorageCategory.MANUFACTURED,
          available: 1000,
          name: "",
          stored: {},
          reserved: {},
        },
      };
      expect(testStartProduction(production, modifiers, items, storage as Record<EStorageCategory, IStorage>)).toBe(true);
    });

  });

});

describe("produce", () => {

  it("increases time on tick", () => {
    produce();
  });

  it("increases time on start and subtracts resources", () => {
    produce();
  });

  it("increases time on overflow and adds resources", () => {
    produce();
  });

  it("increases time on overflow and caps", () => {
    produce();
  });

  it("increases time on overflow and takes resources as well as adding", () => {
    produce();
  });

});