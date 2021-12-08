
// we need both vertical and horizontal expansion

import { IObject } from ".";

// cannot output any inputs
export interface IProduction extends IObject {
  // the number of production buildings of this type
  amount: number;
  // consumption - must be a subset of required
  consumption: [number, number][];
  // output
  output: [number, number][];
  // time
  time: number;
  progress: number;
  name: string;
};