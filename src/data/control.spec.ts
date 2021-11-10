import { SimulationControl } from "./control";
import { EModifierType } from "./modifier";
import { EStorageCategory } from "./storage";

describe("SimulationControl class", () => {
  describe("constructor", () => {

    it("runs on no inputs", () => {
      new SimulationControl({});
    });

  });

  describe("reset", () => {
    it("runs successfully", () => {
      const control = new SimulationControl({});
      control.reset();
    });

  });
});
