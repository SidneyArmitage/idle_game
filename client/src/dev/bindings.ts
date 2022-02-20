import { EStorageCategory } from "shared";
import { SimulationControl } from "../data/control";

export class Bindings {
  private control: SimulationControl;
  private stepDistance: number;

  constructor(control: SimulationControl) {
    this.control = control;
    this.stepDistance = 0.25;
  }

  start() {
    this.control.start();
  }

  stop() {
    this.control.stop();
  }

  step() {
    if (!this.control.getIsRunning()) {
      this.control.step(this.stepDistance);
    }
  }

  setDistance(distance: number) {
    this.stepDistance = distance;
  }

  dump() {
    console.log("storage");
    console.dir({
      [EStorageCategory.BULK]: this.control.getStore(EStorageCategory.BULK),
      [EStorageCategory.EXOTIC]: this.control.getStore(EStorageCategory.EXOTIC),
      [EStorageCategory.MANUFACTURED]: this.control.getStore(EStorageCategory.MANUFACTURED),
    });
    console.log("producers");
    console.dir(this.control.getProducers());
  }

}