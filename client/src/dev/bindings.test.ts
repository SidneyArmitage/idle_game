import { SimulationControl } from "../data/control";
import { Bindings } from "./bindings";

describe("bindings", () => {
  let spied: jest.MockInstance<number, [callback: FrameRequestCallback]>;
  
  beforeEach(() => {
    let count = 0;
    spied = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      // limit loops to 2
      if (++count < 3) {
        new Promise(resolve => resolve(cb(1)));
      }
      return count;
    });
  });

  afterEach(() => {
    if (spied) {
      spied.mockRestore();
    }
  });

  it("starts the loop", () => {
    const control = new SimulationControl();
    const bindings = new Bindings(control);
    bindings.start();
    expect(control.getIsRunning()).toBe(true);
    expect(control.getLast()).not.toBe(0);
  });

  it("stops the loop", () => {
    const control = new SimulationControl();
    const bindings = new Bindings(control);
    bindings.start();
    expect(control.getIsRunning()).toBe(true);
    const last = control.getLast();
    bindings.stop();
    expect(control.getIsRunning()).toBe(false);
    expect(control.getLast()).toBe(last);
  });

});