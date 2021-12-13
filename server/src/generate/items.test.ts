import { EStorageCategory, IItem } from "shared";
import { createItem, createTierItems } from "./items";

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
    expect(createItem("Stone", 0, "{{name}} Ore the precursor to its more processed and useful form", EStorageCategory.BULK, "")).toStrictEqual(expected)
  });

});

describe("create Tier Items", () => {

  it("creates all of the base items for the tier", () => {
    const expected: IItem[] = [
      {
        id: 0,
        description: "Stone Ore the precursor to its more processed and useful form",
        icon: "",
        name: "Stone",
        storageCategory: EStorageCategory.BULK,
      },
      {
        id: 1,
        description: "Stone blocks are ready to be processed into more advanced goods",
        icon: "",
        name: "Stone Block",
        storageCategory: EStorageCategory.BULK,
      },
    ];
    expect(createTierItems({
      value: 1,
      burn: ["wood"],
      tool: ["wood"],
      luxury: {},
      overrides: {},
      resource: "stone",
    }, {
      value: 1,
      wood: {},
      burn: {},
    }, ["generation", "refinement"])).toStrictEqual(expected);
  });

});