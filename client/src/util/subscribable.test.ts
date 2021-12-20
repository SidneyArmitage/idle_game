import Subscribable from "./subscribable";

describe("Describable", () => {

  it("is initialised with the given value", () => {
    new Subscribable<number>(0);
  });

  it("can get the value given", () => {
    const subscribable = new Subscribable<number>(0);
    expect(subscribable.get()).toBe(0);
  });

  it("returns a deep copy of the value", () => {
    const value = {
      a: {
        b: 0,
      },
    };
    const subscribable = new Subscribable(value);
    subscribable.get().a.b = 3;
    expect(subscribable.get()).toStrictEqual({
      a: {
        b: 0,
      },
    });
  });

  it("overwrites the last value", () => {
    const subscribable = new Subscribable<number>(1);
    subscribable.set(0);
    expect(subscribable.get()).toBe(0);
  });

  describe("addSubscriber", () => {

    it("subscribes to the value", () => {
      const subscribable = new Subscribable<number>(1);
      subscribable.subscribe(() => {
        throw Error("Fail");
      });
    });

    it("gets called on set", () => {
      const subscribable = new Subscribable<number>(1);
      let count = 0;
      subscribable.subscribe(() => {
        count += 1;
      });
      subscribable.set(0);
      expect(subscribable.get()).toBe(0);
      expect(count).toBe(1);
    });

    it("can have multiple subscribers", () => {
      const subscribable = new Subscribable<number>(1);
      let count = 0;
      let count1 = 0;
      subscribable.subscribe(() => {
        count += 1;
      });
      subscribable.subscribe(() => {
        count1 += 1;
      });
      subscribable.set(0);
      expect(subscribable.get()).toBe(0);
      expect(count).toBe(1);
      expect(count1).toBe(1);
    });

    it("returns the id on subscription", () => {
      const subscribable = new Subscribable<number>(1);
      expect(subscribable.subscribe(() => {
        throw Error("Fail");
      })).toBe(0);
    });

    it("increments the id on subscription", () => {
      const subscribable = new Subscribable<number>(1);
      expect(subscribable.subscribe(() => {
        throw Error("Fail");
      })).toBe(0);
      expect(subscribable.subscribe(() => {
        throw Error("Fail");
      })).toBe(1);
    });

  });

  describe("unSubscribe", () => {

    it("returns false on no action", () => {
      const subscribable = new Subscribable<number>(1);
      expect(subscribable.unsubscribe(0)).toBe(false);
    });

    it("returns true on unsubscription", () => {
      const subscribable = new Subscribable<number>(1);
      subscribable.subscribe(() => {
        throw Error("Fail");
      });
      expect(subscribable.unsubscribe(0)).toBe(true);
    });

    it("removes the correct id on unsubscription", () => {
      const subscribable = new Subscribable<number>(1);
      let count = [0, 0];
      expect(subscribable.subscribe(() => {
        count[0] += 1;
      })).toBe(0);
      expect(subscribable.subscribe(() => {
        throw Error("Fail");
      })).toBe(1);
      expect(subscribable.subscribe(() => {
        count[1] += 1;
      })).toBe(2);
      expect(subscribable.unsubscribe(1)).toBe(true);
      subscribable.set(0);
      expect(subscribable.get()).toBe(0);
      expect(count[0]).toBe(1);
      expect(count[1]).toBe(1);
    });

    it("can perform multiple unsubscriptions", () => {
      const subscribable = new Subscribable<number>(1);
      let count = 0;
      expect(subscribable.subscribe(() => {
        count += 1;
      })).toBe(0);
      expect(subscribable.subscribe(() => {
        throw Error("Fail");
      })).toBe(1);
      expect(subscribable.subscribe(() => {
        throw Error("Fail");
      })).toBe(2);
      expect(subscribable.unsubscribe(1)).toBe(true);
      expect(subscribable.unsubscribe(2)).toBe(true);
      expect(subscribable.subscribe(() => {
        throw Error("Fail");
      })).toBe(3);
      expect(subscribable.unsubscribe(3)).toBe(true);
      subscribable.set(0);
      expect(subscribable.get()).toBe(0);
      expect(count).toBe(1);
    });

  });

});