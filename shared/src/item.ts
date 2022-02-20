import { IObject } from ".";
import { EStorageCategory } from "./storage";


export interface IItem extends IObject {
  storageCategory: EStorageCategory;
};

export interface IGetItem extends IItem {
  current: number;
  max?: number;
}