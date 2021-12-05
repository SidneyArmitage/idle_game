import { EStorageCategory } from "../data/storage";
import { IItem } from "../data/types";

export default [
  {
    description: "Straight from the tree",
    name: "Log",
    id: 0,
    icon: "",
    storageCategory: EStorageCategory.BULK,
  },
  {
    description: "The basic heavy building material",
    name: "Stone",
    id: 1,
    icon: "",
    storageCategory: EStorageCategory.BULK,
  },
  {
    description: "Raw food, fresh from the fields",
    name: "Wheat",
    id: 2,
    icon: "",
    storageCategory: EStorageCategory.BULK,
  },
  {
    description: "They are the core of production",
    name: "Population",
    id: 3,
    icon: "",
    storageCategory: EStorageCategory.POPULATION,
  },
  {
    description: "Logs that are cut down to dimensions to be more usable for fine products",
    name: "Plank",
    id: 4,
    icon: "",
    storageCategory: EStorageCategory.BULK,
  },
] as IItem[];