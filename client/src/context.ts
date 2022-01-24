import { createContext } from "react";
import { SimulationControl } from "./data/control";
import StateControl from "./stateControl";

export const dataContext = createContext(new SimulationControl());
export const stateContext = createContext(new StateControl());