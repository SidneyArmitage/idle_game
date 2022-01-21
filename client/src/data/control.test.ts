import { EStorageCategory } from "shared";
import { SimulationControl } from "./control";

describe("SimulationControl class", () => {
  describe("constructor", () => {

    it("runs on no inputs", () => {
      new SimulationControl();
    });

  });

  describe("init", () => {
    const control = new SimulationControl();
    control.init({}, {});
  })

  describe("reset", () => {

    it("runs successfully", () => {
      const control = new SimulationControl();
      control.reset();
    });

  });

  describe("getItems", () => {

    it("gets the items from one category", () => {
      const control = new SimulationControl();
      control.init({
        0: {
        description: "Straight from the tree",
        name: "Log",
        id: 0,
        icon: "",
        storageCategory: EStorageCategory.BULK,
      },
      1: {
        description: "The basic heavy building material",
        name: "Stone",
        id: 1,
        icon: "",
        storageCategory: EStorageCategory.BULK,
      },
      2: {
        description: "Raw food, fresh from the fields",
        name: "Wheat",
        id: 2,
        icon: "",
        storageCategory: EStorageCategory.BULK,
      },
      3: {
        description: "They are the core of production",
        name: "Population",
        id: 3,
        icon: "",
        storageCategory: EStorageCategory.POPULATION,
      },
    }, {});
      expect(control.getItems(false, EStorageCategory.POPULATION)).toStrictEqual([{
        description: "They are the core of production",
        name: "Population",
        id: 3,
        icon: "",
        storageCategory: EStorageCategory.POPULATION,
      }]);
    });

    it("gets the items from multiple categories", () => {
      const control = new SimulationControl();
      control.init({
        0: {
        description: "Straight from the tree",
        name: "Log",
        id: 0,
        icon: "",
        storageCategory: EStorageCategory.BULK,
      },
      1: {
        description: "The basic heavy building material",
        name: "Stone",
        id: 1,
        icon: "",
        storageCategory: EStorageCategory.BULK,
      },
      2: {
        description: "Raw food, fresh from the fields",
        name: "Wheat",
        id: 2,
        icon: "",
        storageCategory: EStorageCategory.BULK,
      },
      3: {
        description: "They are the core of production",
        name: "Population",
        id: 3,
        icon: "",
        storageCategory: EStorageCategory.POPULATION,
      },
    }, {});
      expect(control.getItems(false, EStorageCategory.POPULATION | EStorageCategory.BULK)).toStrictEqual([
        {
          description: "Straight from the tree",
          name: "Log",
          id: 0,
          icon: "",
          storageCategory: EStorageCategory.BULK,
        },
        {
          description: "The basic heavy building material",
          name: "Stone",
          id: 1,
          icon: "",
          storageCategory: EStorageCategory.BULK,
        },
        {
          description: "Raw food, fresh from the fields",
          name: "Wheat",
          id: 2,
          icon: "",
          storageCategory: EStorageCategory.BULK,
        },
        {
        description: "They are the core of production",
        name: "Population",
        id: 3,
        icon: "",
        storageCategory: EStorageCategory.POPULATION,
      }]);
    });

    it("returns with amounts when required", () => {
      const control = new SimulationControl();
      control.init({
        0: {
        description: "Straight from the tree",
        name: "Log",
        id: 0,
        icon: "",
        storageCategory: EStorageCategory.BULK,
      },
      1: {
        description: "The basic heavy building material",
        name: "Stone",
        id: 1,
        icon: "",
        storageCategory: EStorageCategory.BULK,
      },
      2: {
        description: "Raw food, fresh from the fields",
        name: "Wheat",
        id: 2,
        icon: "",
        storageCategory: EStorageCategory.BULK,
      },
      3: {
        description: "They are the core of production",
        name: "Population",
        id: 3,
        icon: "",
        storageCategory: EStorageCategory.POPULATION,
      },
    }, {});
    expect(control.getItems(true, EStorageCategory.POPULATION)).toStrictEqual([{
      description: "They are the core of production",
      name: "Population",
      id: 3,
      icon: "",
      storageCategory: EStorageCategory.POPULATION,
      current: 0,
    }]);
    });
  });

  describe("start", () => {
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
      control.start();
      expect(control.getIsRunning()).toBe(true);
      expect(control.getLast()).not.toBe(0);
    });

    it("restarts the loop", () => {
      const control = new SimulationControl();
      control.start();
      expect(control.getIsRunning()).toBe(true);
      control.stop();
      expect(control.getIsRunning()).toBe(false);
      control.start();
      expect(control.getIsRunning()).toBe(true);
    });

  });

  describe("stop", () => {
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

    it("stops the loop", () => {
      const control = new SimulationControl();
      control.start();
      expect(control.getIsRunning()).toBe(true);
      const last = control.getLast();
      control.stop();
      expect(control.getIsRunning()).toBe(false);
      expect(control.getLast()).toBe(last);
    });

  });
});
