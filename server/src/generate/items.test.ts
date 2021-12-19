import { EStorageCategory, IItem } from "shared";
import { createEpochItems, createItem, createTierItems, default as generatesItems } from "./items";

describe("Create Item", () => {

  it("creates a base resource", () => {
    const expected: IItem = {
      id: 0,
      description: "test",
      icon: "",
      name: "Stone",
      storageCategory: EStorageCategory.BULK,
    };
    expect(createItem("Stone", 0, "test", EStorageCategory.BULK, "")).toStrictEqual(expected)
  });

  it("creates a base resource", () => {
    const expected: IItem = {
      id: 0,
      description: "Stone Ore the precursor to its more processed and useful form",
      icon: "",
      name: "Stone",
      storageCategory: EStorageCategory.BULK,
    };
    expect(createItem("Stone", 0, "{{this}} Ore the precursor to its more processed and useful form", EStorageCategory.BULK, "")).toStrictEqual(expected)
  });

});

describe("create Tier Items", () => {

  it("creates all of the base items for the tier", () => {
    const expected: IItem[] = [
      {
        id: 0,
        description: "Tin ore the precursor to its more processed and useful form",
        icon: "",
        name: "Tin ore",
        storageCategory: EStorageCategory.BULK,
      },
      {
        id: 1,
        description: "A Tin ingot is ready to be processed into more advanced goods",
        icon: "",
        name: "Tin ingot",
        storageCategory: EStorageCategory.MANUFACTURED,
      },
    ];
    expect(createTierItems({
      value: 1,
      burn: ["wood"],
      tool: ["wood"],
      luxury: {},
      overrides: {
        generation: {
          itemName: "Tin ore",
        },
        refinement: {
          itemName: "Tin ingot",
          itemDescription: "A {{this}} is ready to be processed into more advanced goods",
          storageCategory: 2,
        }
      },
      resource: "Tin",
    }, {
      generation: {
        storageCategory: 1,
        time: 0,
        value: 0,
        itemDescription: "{{this}} the precursor to its more processed and useful form",
        input: [],
        output: [],
        
        producerName: "",
        itemName: "",
        producerDescription: "",
      }, 
      refinement: {
        storageCategory: 1,
        time: 0,
        value: 0,
        itemDescription: "should not show",
        input: [],
        output: [],
        
        producerName: "",
        itemName: "",
        producerDescription: "",
      },
    }, 0)).toStrictEqual([2, expected]);
  });

  it("creates all of the base items for the tier with a default", () => {
    const expected: IItem[] = [
      {
        id: 0,
        description: "Tin the precursor to its more processed and useful form",
        icon: "",
        name: "Tin",
        storageCategory: EStorageCategory.BULK,
      },
    ];
    expect(createTierItems({
      value: 1,
      burn: ["wood"],
      tool: ["wood"],
      luxury: {},
      overrides: {
      },
      resource: "Tin",
    }, {
      generation: {
        storageCategory: 1,
        time: 0,
        value: 0,
        itemDescription: "{{this}} the precursor to its more processed and useful form",
        input: [],
        output: [],
        
        producerName: "",
        itemName: "{{resource}}",
        producerDescription: "",
      }, 
    }, 0)).toStrictEqual([1, expected]);
  });

});

describe("create Epoch Items", () => {

  it("creates wood and burn", () => {
    const output = [
      {
        id: 0,
        description: "wood is used as an inefficient fuel or part of more complex constructions.",
        icon: "",
        name: "wood",
        storageCategory: EStorageCategory.BULK,
      },
      {
        id: 1,
        description: "coal is used as an efficient fuel.",
        icon: "",
        name: "coal",
        storageCategory: EStorageCategory.BULK,
      },
    ];
    expect(createEpochItems({
      value: 1,
      overrides: {
        burn: {
          itemName: "coal",
        }
      },
    },
    {
      wood: {
        time: 1,
        value: 1,
        storageCategory: 1,
        itemDescription: "{{this}} is used as an inefficient fuel or part of more complex constructions.",
        input: [],
        output: [],
        
        producerName: "",
        itemName: "wood",
        producerDescription: "",
      },
      burn: {
        time: 2,
        value: 2,
        storageCategory: 1,
        itemDescription: "{{this}} is used as an efficient fuel.",
        input: [],
        output: [],
        producerName: "",
        itemName: "",
        producerDescription: "",
      }
    }, 0)).toStrictEqual([2, output]);
  });

});

describe("generate items (default)", () => {
  
  it("works", () => {
    const expected = [
      {
        id: 0,
        description: "wood is used as an inefficient fuel or part of more complex constructions.",
        icon: "",
        name: "wood",
        storageCategory: EStorageCategory.BULK,
      },
      {
        id: 1,
        description: "coal is used as an efficient fuel.",
        icon: "",
        name: "coal",
        storageCategory: EStorageCategory.BULK,
      },
      {
        id: 2,
        description: "Tin ore the precursor to its more processed and useful form",
        icon: "",
        name: "Tin ore",
        storageCategory: EStorageCategory.BULK,
      },
      {
        id: 3,
        description: "A Tin ingot is ready to be processed into more advanced goods",
        icon: "",
        name: "Tin ingot",
        storageCategory: EStorageCategory.MANUFACTURED,
      },
    ];
    expect(generatesItems({
      tin: {
        value: 1,
        burn: ["wood"],
        tool: ["wood"],
        luxury: {},
        overrides: {
          generation: {
            itemName: "Tin ore",
          },
          refinement: {
            itemName: "Tin ingot",
            itemDescription: "A {{this}} is ready to be processed into more advanced goods",
            storageCategory: 2,
          }
        },
        resource: "Tin",
      },
    },
    {
      generation: {
        storageCategory: 1,
        time: 0,
        value: 0,
        itemDescription: "{{this}} the precursor to its more processed and useful form",
        input: [],
        output: [],
        
        producerName: "",
        itemName: "",
        producerDescription: "",
      }, 
      refinement: {
        storageCategory: 1,
        time: 0,
        value: 0,
        itemDescription: "should not show",
        input: [],
        output: [],
        
        producerName: "",
        itemName: "",
        producerDescription: "",
      },
    },
    { 
      ancient: {
        value: 1,
        overrides: {
          burn: {
            itemName: "coal",
          }
        },
      },
    },
    {
      wood: {
        time: 1,
        value: 1,
        storageCategory: 1,
        itemDescription: "{{this}} is used as an inefficient fuel or part of more complex constructions.",
        input: [],
        output: [],
        
        producerName: "",
        itemName: "wood",
        producerDescription: "",
      },
      burn: {
        time: 2,
        value: 2,
        storageCategory: 1,
        itemDescription: "{{this}} is used as an efficient fuel.",
        input: [],
        output: [],
        
        producerName: "",
        itemName: "",
        producerDescription: "",
      }
    })).toStrictEqual(expected);
  });

});