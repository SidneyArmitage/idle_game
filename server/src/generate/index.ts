import { EStorageCategory } from "shared";

export interface IItemBase {
  time: number;
  value: number;
  output: string[];
  input: string[];
  storageCategory: EStorageCategory;
  itemDescription: string;
  producer: string;
  producerDescription: string;
}

export interface IOverride {
  itemName?: string;
  itemDescription?: string;
  output?: string[];
  input?: string[];
  storageCategory?: EStorageCategory;
  producerName?: string;
  producerDescription?: string;
}

export interface IEpoch {
  value: number;
  overrides: Record<string, IOverride>;
}

export interface ITier {
  value: number;
  burn: string[];
  tool: string[];
  luxury: IOverride;
  overrides: Record<string, IOverride>;
  resource: string;
}
