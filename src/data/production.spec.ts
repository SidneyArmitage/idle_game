import { EModifierEffect, EModifierType, Modifiers } from "./modifier";
import { getConsumption, getOutput, getTime, IProduction } from "./production";
import { EStorageCategory } from "./storage";
import { IItem } from "./types";

describe("get consumption", () => {
  
  describe("no modifiers", () => {
    
    it("has no units (amount is 0)", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.CONSUMPTION]: {

          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.CONSUMPTION]: {

          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.CONSUMPTION]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 0,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers as Modifiers, items)).toStrictEqual([[1, 0]]);
    });

    it("has no inputs", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.CONSUMPTION]: {

          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.CONSUMPTION]: {

          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.CONSUMPTION]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers as Modifiers, items).length).toBe(0);
    });

    it("has one input", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.CONSUMPTION]: {

          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.CONSUMPTION]: {

          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.CONSUMPTION]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers as Modifiers, items)).toStrictEqual([[1, 10]]);
    });

    it("has 2 inputs", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.CONSUMPTION]: {

          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.CONSUMPTION]: {

          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.CONSUMPTION]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [[1, 10], [2, 12]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers as Modifiers, items)).toStrictEqual([[1, 10], [2, 12]]);
    });

  });

  describe("category modifier", () => {

    it("has no units (amount is 0)", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.CONSUMPTION]: {
            [EStorageCategory.BULK]: {
              value: (base: number) => base + 10,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.CONSUMPTION,
            }
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.CONSUMPTION]: {

          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.CONSUMPTION]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 0,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers as Modifiers, items)).toStrictEqual([[1, 0]]);
    });

    it("has no inputs", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.CONSUMPTION]: {
            [EStorageCategory.BULK]: {
              value: (base: number) => base + 10,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.CONSUMPTION,
            }
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.CONSUMPTION]: {

          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.CONSUMPTION]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers as Modifiers, items).length).toBe(0);
    });

    it("has one input", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.CONSUMPTION]: {
            [EStorageCategory.BULK]: {
              value: (base: number) => base + 10,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.CONSUMPTION,
            }
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.CONSUMPTION]: {

          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.CONSUMPTION]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers as Modifiers, items)).toStrictEqual([[1, 20]]);
    });

    it("has 2 inputs", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.CONSUMPTION]: {
            [EStorageCategory.BULK]: {
              value: (base: number) => base * 2,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.CONSUMPTION,
            },
            [EStorageCategory.MANUFACTURED]: {
              value: (base: number) => base * 3,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.CONSUMPTION,
            }
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.CONSUMPTION]: {

          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.CONSUMPTION]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [[1, 10], [2, 12]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
        2: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.MANUFACTURED,
        },
      };
      expect(getConsumption(production, modifiers as Modifiers, items)).toStrictEqual([[1, 20], [2, 36]]);
    });

  });

  describe("focused modifier", () => {

    it("has no units (amount is 0)", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.CONSUMPTION]: {
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.CONSUMPTION]: {
            [0]: {
              value: (base: number) => base + 10,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.CONSUMPTION,
            }
          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.CONSUMPTION]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 0,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers as Modifiers, items)).toStrictEqual([[1, 0]]);
    });

    it("has no inputs", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.CONSUMPTION]: {
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.CONSUMPTION]: {
            [0]: {
              value: (base: number) => base + 10,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.CONSUMPTION,
            }
          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.CONSUMPTION]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers as Modifiers, items).length).toBe(0);
    });

    it("has one input", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.CONSUMPTION]: {
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.CONSUMPTION]: {
            [0]: {
              value: (base: number) => base + 10,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.CONSUMPTION,
            }
          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.CONSUMPTION]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers as Modifiers, items)).toStrictEqual([[1, 20]]);
    });

    it("has 2 inputs", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.CONSUMPTION]: {
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.CONSUMPTION]: {
            [0]: {
              value: (base: number) => base * 2,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.CONSUMPTION,
            }
          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.CONSUMPTION]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [[1, 10], [2, 12]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers as Modifiers, items)).toStrictEqual([[1, 20], [2, 24]]);
    });

  });

  describe("goods modifier", () => {

    it("has no units (amount is 0)", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.CONSUMPTION]: {
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.CONSUMPTION]: {
          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.CONSUMPTION]: {
            [1]: {
              value: (base: number) => base + 10,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.CONSUMPTION,
            }
          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 0,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers as Modifiers, items)).toStrictEqual([[1, 0]]);
    });

    it("has no inputs", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.CONSUMPTION]: {
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.CONSUMPTION]: {
          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.CONSUMPTION]: {
            [1]: {
              value: (base: number) => base + 10,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.CONSUMPTION,
            }
          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers as Modifiers, items).length).toBe(0);
    });

    it("has one input", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.CONSUMPTION]: {
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.CONSUMPTION]: {
          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.CONSUMPTION]: {
            [1]: {
              value: (base: number) => base + 10,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.CONSUMPTION,
            }
          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers as Modifiers, items)).toStrictEqual([[1, 20]]);
    });

    it("has 2 inputs", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.CONSUMPTION]: {
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.CONSUMPTION]: {
          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.CONSUMPTION]: {
            [1]: {
              value: (base: number) => base * 2,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.CONSUMPTION,
            },
            [2]: {
              value: (base: number) => base * 3,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.CONSUMPTION,
            },
          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [[1, 10], [2, 12]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
        2: {
          description: "",
          icon: "",
          id: 2,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getConsumption(production, modifiers as Modifiers, items)).toStrictEqual([[1, 20], [2, 36]]);
    });

  });

});

describe("get output", () => {
  
  describe("no modifiers", () => {
    
    it("has no units (amount is 0)", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.OUTPUT]: {

          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.OUTPUT]: {

          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.OUTPUT]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 0,
        output: [[1, 10]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers as Modifiers, items)).toStrictEqual([[1, 0]]);
    });

    it("has no outputs", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.OUTPUT]: {

          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.OUTPUT]: {

          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.OUTPUT]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers as Modifiers, items).length).toBe(0);
    });

    it("has one output", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.OUTPUT]: {

          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.OUTPUT]: {

          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.OUTPUT]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        output: [[1, 10]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers as Modifiers, items)).toStrictEqual([[1, 10]]);
    });

    it("has 2 outputs", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.OUTPUT]: {

          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.OUTPUT]: {

          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.OUTPUT]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        output: [[1, 10], [2, 12]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers as Modifiers, items)).toStrictEqual([[1, 10], [2, 12]]);
    });

  });

  describe("category modifier", () => {

    it("has no units (amount is 0)", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.OUTPUT]: {
            [EStorageCategory.BULK]: {
              value: (base: number) => base + 10,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.OUTPUT,
            }
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.OUTPUT]: {

          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.OUTPUT]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 0,
        output: [[1, 10]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers as Modifiers, items)).toStrictEqual([[1, 0]]);
    });

    it("has no outputs", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.OUTPUT]: {
            [EStorageCategory.BULK]: {
              value: (base: number) => base + 10,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.OUTPUT,
            }
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.OUTPUT]: {

          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.OUTPUT]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers as Modifiers, items).length).toBe(0);
    });

    it("has one output", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.OUTPUT]: {
            [EStorageCategory.BULK]: {
              value: (base: number) => base + 10,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.OUTPUT,
            }
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.OUTPUT]: {

          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.OUTPUT]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        output: [[1, 10]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers as Modifiers, items)).toStrictEqual([[1, 20]]);
    });

    it("has 2 outputs", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.OUTPUT]: {
            [EStorageCategory.BULK]: {
              value: (base: number) => base * 2,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.OUTPUT,
            },
            [EStorageCategory.MANUFACTURED]: {
              value: (base: number) => base * 3,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.OUTPUT,
            }
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.OUTPUT]: {

          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.OUTPUT]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        output: [[1, 10], [2, 12]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
        2: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.MANUFACTURED,
        },
      };
      expect(getOutput(production, modifiers as Modifiers, items)).toStrictEqual([[1, 20], [2, 36]]);
    });

  });

  describe("focused modifier", () => {

    it("has no units (amount is 0)", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.OUTPUT]: {
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.OUTPUT]: {
            [0]: {
              value: (base: number) => base + 10,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.OUTPUT,
            }
          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.OUTPUT]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 0,
        output: [[1, 10]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers as Modifiers, items)).toStrictEqual([[1, 0]]);
    });

    it("has no outputs", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.OUTPUT]: {
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.OUTPUT]: {
            [0]: {
              value: (base: number) => base + 10,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.OUTPUT,
            }
          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.OUTPUT]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers as Modifiers, items).length).toBe(0);
    });

    it("has one output", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.OUTPUT]: {
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.OUTPUT]: {
            [0]: {
              value: (base: number) => base + 10,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.OUTPUT,
            }
          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.OUTPUT]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        output: [[1, 10]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers as Modifiers, items)).toStrictEqual([[1, 20]]);
    });

    it("has 2 outputs", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.OUTPUT]: {
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.OUTPUT]: {
            [0]: {
              value: (base: number) => base * 2,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.OUTPUT,
            }
          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.OUTPUT]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        output: [[1, 10], [2, 12]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers as Modifiers, items)).toStrictEqual([[1, 20], [2, 24]]);
    });

  });

  describe("goods modifier", () => {

    it("has no units (amount is 0)", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.OUTPUT]: {
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.OUTPUT]: {
          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.OUTPUT]: {
            [1]: {
              value: (base: number) => base + 10,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.OUTPUT,
            }
          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 0,
        output: [[1, 10]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers as Modifiers, items)).toStrictEqual([[1, 0]]);
    });

    it("has no outputs", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.OUTPUT]: {
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.OUTPUT]: {
          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.OUTPUT]: {
            [1]: {
              value: (base: number) => base + 10,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.OUTPUT,
            }
          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers as Modifiers, items).length).toBe(0);
    });

    it("has one output", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.OUTPUT]: {
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.OUTPUT]: {
          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.OUTPUT]: {
            [1]: {
              value: (base: number) => base + 10,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.OUTPUT,
            }
          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        output: [[1, 10]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers as Modifiers, items)).toStrictEqual([[1, 20]]);
    });

    it("has 2 outputs", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.OUTPUT]: {
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.OUTPUT]: {
          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.OUTPUT]: {
            [1]: {
              value: (base: number) => base * 2,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.OUTPUT,
            },
            [2]: {
              value: (base: number) => base * 3,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.OUTPUT,
            },
          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        output: [[1, 10], [2, 12]],
        consumption: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
        2: {
          description: "",
          icon: "",
          id: 2,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getOutput(production, modifiers as Modifiers, items)).toStrictEqual([[1, 20], [2, 36]]);
    });

  });

});


describe("get time", () => {
  
  describe("no modifiers", () => {
    
    it("has no units (amount is 0)", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.TIME]: {

          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.TIME]: {

          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.TIME]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 0,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers as Modifiers, items)).toBe(0);
    });
    
    it("has a unit", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.TIME]: {

          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.TIME]: {

          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.TIME]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers as Modifiers, items)).toBe(1);
    });

  });

  describe("category modifier", () => {

    it("has no units (amount is 0)", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.TIME]: {
            [EStorageCategory.BULK]: {
              value: (base: number) => base * 0.9,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.TIME,
            }
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.TIME]: {

          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.TIME]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 0,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers as Modifiers, items)).toBe(0);
    });

    it("has no inputs", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.TIME]: {
            [EStorageCategory.BULK]: {
              value: (base: number) => base * 0.9,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.TIME,
            }
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.TIME]: {

          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.TIME]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers as Modifiers, items)).toBe(1);
    });

    it("has one input", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.TIME]: {
            [EStorageCategory.BULK]: {
              value: (base: number) => base * 0.9,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.TIME,
            }
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.TIME]: {

          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.TIME]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers as Modifiers, items)).toBe(0.9);
    });

    it("has 2 inputs", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.TIME]: {
            [EStorageCategory.BULK]: {
              value: (base: number) => base * 2,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.TIME,
            },
            [EStorageCategory.MANUFACTURED]: {
              value: (base: number) => base * 3,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.TIME,
            }
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.TIME]: {

          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.TIME]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [[1, 10], [2, 12]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
        2: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.MANUFACTURED,
        },
      };
      expect(getTime(production, modifiers as Modifiers, items)).toStrictEqual([[1, 20], [2, 36]]);
    });

  });

  describe("focused modifier", () => {

    it("has no units (amount is 0)", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.TIME]: {
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.TIME]: {
            [0]: {
              value: (base: number) => base + 10,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.TIME,
            }
          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.TIME]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 0,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers as Modifiers, items)).toStrictEqual([[1, 0]]);
    });

    it("has no inputs", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.TIME]: {
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.TIME]: {
            [0]: {
              value: (base: number) => base + 10,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.TIME,
            }
          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.TIME]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers as Modifiers, items).length).toBe(0);
    });

    it("has one input", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.TIME]: {
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.TIME]: {
            [0]: {
              value: (base: number) => base + 10,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.TIME,
            }
          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.TIME]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers as Modifiers, items)).toStrictEqual([[1, 20]]);
    });

    it("has 2 inputs", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.TIME]: {
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.TIME]: {
            [0]: {
              value: (base: number) => base * 2,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.TIME,
            }
          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.TIME]: {

          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [[1, 10], [2, 12]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers as Modifiers, items)).toStrictEqual([[1, 20], [2, 24]]);
    });

  });

  describe("goods modifier", () => {

    it("has no units (amount is 0)", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.TIME]: {
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.TIME]: {
          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.TIME]: {
            [1]: {
              value: (base: number) => base + 10,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.TIME,
            }
          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 0,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers as Modifiers, items)).toStrictEqual([[1, 0]]);
    });

    it("has no inputs", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.TIME]: {
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.TIME]: {
          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.TIME]: {
            [1]: {
              value: (base: number) => base + 10,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.TIME,
            }
          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers as Modifiers, items).length).toBe(0);
    });

    it("has one input", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.TIME]: {
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.TIME]: {
          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.TIME]: {
            [1]: {
              value: (base: number) => base + 10,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.TIME,
            }
          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [[1, 10]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers as Modifiers, items)).toStrictEqual([[1, 20]]);
    });

    it("has 2 inputs", () => {
      const modifiers: unknown = {
        [EModifierType.CATEGORIES]: {
          [EModifierEffect.TIME]: {
          }
        },
        [EModifierType.FOCUSED]: {
          [EModifierEffect.TIME]: {
          }
        },
        [EModifierType.GOODS]: {
          [EModifierEffect.TIME]: {
            [1]: {
              value: (base: number) => base * 2,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.TIME,
            },
            [2]: {
              value: (base: number) => base * 3,
              type: EModifierType.CATEGORIES,
              effects: EModifierEffect.TIME,
            },
          }
        },
      };
      const production: IProduction = {
        id: 0,
        name: "",
        description: "",
        icon: "",
        amount: 1,
        consumption: [[1, 10], [2, 12]],
        output: [],
        time: 1,
        progress: 0,
      };
      const items: Record<number, IItem> = {
        1: {
          description: "",
          icon: "",
          id: 1,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
        2: {
          description: "",
          icon: "",
          id: 2,
          name: "",
          storageCategory: EStorageCategory.BULK,
        },
      };
      expect(getTime(production, modifiers as Modifiers, items)).toStrictEqual([[1, 20], [2, 36]]);
    });

  });

});