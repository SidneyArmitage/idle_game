import { EStorageCategory } from "../data/storage";
import { IItem } from "../data/types";

export default [
  {
    description: "The basic construction material",
    name: "Wood",
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
] as IItem[];