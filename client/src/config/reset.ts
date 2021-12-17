import { initModifiers, Modifiers } from "../data/modifier";
import { EStorageCategory } from "shared";
import { IStorage } from "../data/storage";


export interface IClassControlReset {
  modifier: Modifiers;
  storage: Record<EStorageCategory, IStorage>;
  purchasedResearch: [];
};

export const reset = (): IClassControlReset => {
  return {
    storage: {
      [EStorageCategory.BULK]: {
        available: 100,
        description: "Bulk storage for resources with large quantity",
        name: "Bulk",
        icon: "",
        id: EStorageCategory.BULK,
        reserved: {},
        stored: {},
      },
      [EStorageCategory.MANUFACTURED]: {
        available: 100,
        description: "Storage for manufactured goods",
        icon: "",
        id: EStorageCategory.MANUFACTURED,
        name: "Manufactured",
        reserved: {},
        stored: {},
      },
      [EStorageCategory.EXOTIC]: {
        available: 100,
        description: "Storage for perishable or delicate goods",
        icon: "",
        id: EStorageCategory.EXOTIC,
        name: "Exotic",
        reserved: {},
        stored: {},
      },
      [EStorageCategory.POPULATION]: {
        available: 3,
        description: "Where the workers live",
        icon: "",
        id: EStorageCategory.POPULATION,
        name: "Housing",
        reserved: {},
        stored: {},
      },
    },
    modifier: {
      ...initModifiers(),
    },
    purchasedResearch: [],
  };
};