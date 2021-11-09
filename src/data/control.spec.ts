import { reset, SimulationControl } from "./control";
import { EModifierType } from "./modifier";
import { EStorageCategory } from "./storage";

describe("SimulationControl class", () => {
  describe("constructor", () => {

    it("runs on no inputs", () => {
      new SimulationControl();
    });

  });

  describe("reset", () => {
    it("runs successfully", () => {
      const control = new SimulationControl();
      control.reset();
    });

  });
});

describe("reset", () => {
  it("returns the default expected values", () => {
    expect(reset()).toStrictEqual({
      storage: {
        [EStorageCategory.BULK]: {
          available: 0,
          description: "Bulk storage for resources with large quantity",
          name: "Bulk",
          icon: "",
          id: EStorageCategory.BULK,
          reserved: {},
        },
        [EStorageCategory.MANUFACTURED]: {
          available: 0,
          description: "Storage for manufactured goods",
          icon: "",
          id: EStorageCategory.MANUFACTURED,
          name: "Manufactured",
          reserved: {},
        },
        [EStorageCategory.EXOTIC]: {
          available: 0,
          description: "Storage for perishable or delicate goods",
          icon: "",
          id: EStorageCategory.EXOTIC,
          name: "Exotic",
          reserved: {},
        },
      },
      modifier: {
        [EModifierType.CATEGORIES]: {},
        [EModifierType.FOCUSED]: {},
        [EModifierType.GOODS]: {},
      },
      production: [],
      purchasedResearch: [],
    });
  });
});