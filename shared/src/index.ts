export * from "./item";
export * from "./storage";
export * from "./production";


export interface IObject {
  description: string;
  name: string;
  // ID shall be used to identify this in the master map
  id: number;
  // Path to SVG resource (to be added later in process)
  icon: "";
};