import { IObject } from ".";
export interface IProduction extends IObject {
    amount: number;
    consumption: [number, number][];
    output: [number, number][];
    time: number;
    progress: number;
    name: string;
}
