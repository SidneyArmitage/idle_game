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

}