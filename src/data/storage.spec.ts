import { EStorageCategory, IStorage, tryReserve, tryStore } from "./storage";

describe("try reserve", () => {

  describe("success", () => {

    it("reserves a new partition", () => {
      const store: IStorage = {
        id:EStorageCategory.BULK,
        name: "",
        available: 1000,
        description: "",
        icon: "",
        stored: {},
        reserved: {},
      };
      expect(tryReserve(store, 0, 100)).toBe(true);
      expect(store.reserved[0]).toBe(100);
    });

    it("modifies an existing partition positively", () => {
      const store: IStorage = {
        id:EStorageCategory.BULK,
        name: "",
        available: 1000,
        description: "",
        icon: "",
        stored: {},
        reserved: {},
      };
      expect(tryReserve(store, 0, 100)).toBe(true);
      expect(tryReserve(store, 0, 200)).toBe(true);
      expect(store.reserved[0]).toBe(200);
    });
    
    it("modifies an existing partition negatively", () => {
      const store: IStorage = {
        id:EStorageCategory.BULK,
        name: "",
        available: 1000,
        description: "",
        icon: "",
        reserved: {},
        stored: {},
      };
      expect(tryReserve(store, 0, 100)).toBe(true);
      expect(tryReserve(store, 0, 0)).toBe(true);
      expect(store.reserved[0]).toBe(0);
    });

    it("stores more than amount partitioned will be successful on partition", ()=> {
      const store: IStorage = {
        id:EStorageCategory.BULK,
        name: "",
        available: 101,
        description: "",
        icon: "",
        reserved: {},
        stored: {},
      };
      expect(tryStore(store, 0, 100)).toBe(0);
      expect(tryReserve(store, 0, 101)).toBe(true);
      expect(store.reserved[0]).toBe(101);
    });

  });

  describe("fail", () => {
    
    it("doesn`t reserve a new partition if size is too large", () => {
      const store: IStorage = {
        id:EStorageCategory.BULK,
        name: "",
        available: 1000,
        description: "",
        icon: "",
        reserved: {},
        stored: {},
      };
      expect(tryReserve(store, 0, 200)).toBe(true);
      expect(tryReserve(store, 1, 900)).toBe(false);
      expect(store.reserved[0]).toBe(200);
      expect(store.reserved[1]).toBeUndefined();
    });

    it("doesn`t modifies an existing partition if size is too large", () => {
      const store: IStorage = {
        id:EStorageCategory.BULK,
        name: "",
        available: 1000,
        description: "",
        icon: "",
        reserved: {},
        stored: {},
      };
      expect(tryReserve(store, 0, 200)).toBe(true);
      expect(tryReserve(store, 0, 1100)).toBe(false);
      expect(store.reserved[0]).toBe(200);
    });

    it("has a negative value", () => {
      const store: IStorage = {
        id:EStorageCategory.BULK,
        name: "",
        available: 1000,
        description: "",
        icon: "",
        reserved: {},
        stored: {},
      };
      expect(tryReserve(store, 0, -1)).toBe(false);
      expect(store.reserved[0]).toBeUndefined();
    });

    it("fails if out of space due to storage", ()=> {
      const store: IStorage = {
        id:EStorageCategory.BULK,
        name: "",
        available: 101,
        description: "",
        icon: "",
        reserved: {},
        stored: {},
      };
      expect(tryStore(store, 0, 100)).toBe(0);
      expect(tryReserve(store, 1, 2)).toBe(false);
      expect(store.reserved[1]).toBeUndefined();
    });
    
    it("fails if storing more than amount partitioned", ()=> {
      const store: IStorage = {
        id:EStorageCategory.BULK,
        name: "",
        available: 101,
        description: "",
        icon: "",
        reserved: {},
        stored: {},
      };
      expect(tryStore(store, 0, 100)).toBe(0);
      expect(tryReserve(store, 0, 2)).toBe(false);
      expect(store.reserved[1]).toBeUndefined();
    });

  });

});

describe("try store", () => {

  describe("success", () => {

    it("adds a new resource", () => {
      const store: IStorage = {
        id:EStorageCategory.BULK,
        name: "",
        available: 1000,
        description: "",
        icon: "",
        stored: {},
        reserved: {},
      };
      expect(tryStore(store, 0, 100)).toBe(0);
      expect(store.stored[0]).toBe(100);
    });

    it("modifies an existing resource positively", () => {
      const store: IStorage = {
        id:EStorageCategory.BULK,
        name: "",
        available: 1000,
        description: "",
        icon: "",
        stored: {},
        reserved: {},
      };
      expect(tryStore(store, 0, 100)).toBe(0);
      expect(tryStore(store, 0, 100)).toBe(0);
      expect(store.stored[0]).toBe(200);
    });
    
    it("modifies an existing resource negatively", () => {
      const store: IStorage = {
        id:EStorageCategory.BULK,
        name: "",
        available: 1000,
        description: "",
        icon: "",
        reserved: {},
        stored: {},
      };
      expect(tryStore(store, 0, 100)).toBe(0);
      expect(store.stored[0]).toBe(100);
      expect(tryStore(store, 0, -100)).toBe(0);
      expect(store.stored[0]).toBe(0);
    });

  });

  describe("fail", () => {
    
    it("doesn`t store if size is too large", () => {
      const store: IStorage = {
        id:EStorageCategory.BULK,
        name: "",
        available: 1000,
        description: "",
        icon: "",
        stored: {},
        reserved: {},
      };
      expect(tryStore(store, 0, 100)).toBe(0);
      expect(tryStore(store, 1, 1100)).toBe(1100);
      expect(store.stored[0]).toBe(100);
    });

    it("doesn`t store exisiting resource if size is too large", () => {
      const store: IStorage = {
        id:EStorageCategory.BULK,
        name: "",
        available: 1000,
        description: "",
        icon: "",
        reserved: {},
        stored: {},
      };
      expect(tryStore(store, 0, 200)).toBe(0);
      expect(tryStore(store, 0, 900)).toBe(900);
      expect(store.stored[0]).toBe(200);
    });

    it("has a negative value", () => {
      const store: IStorage = {
        id:EStorageCategory.BULK,
        name: "",
        available: 1000,
        description: "",
        icon: "",
        reserved: {},
        stored: {},
      };
      expect(tryStore(store, 0, -1)).toBe(-1);
      expect(store.stored[0]).toBeUndefined();
    });

    it("doesn`t store if not enough unreserved space", () => {
      const store: IStorage = {
        id:EStorageCategory.BULK,
        name: "",
        available: 1000,
        description: "",
        icon: "",
        reserved: {},
        stored: {},
      };
      expect(tryReserve(store, 0, 999)).toBe(true);
      expect(tryStore(store, 1, 10)).toBe(10);
    });
    
    it("doesn`t store if not enough reserved space", () => {
      const store: IStorage = {
        id:EStorageCategory.BULK,
        name: "",
        available: 14,
        description: "",
        icon: "",
        reserved: {},
        stored: {},
      };
      expect(tryReserve(store, 0, 5)).toBe(true);
      expect(tryStore(store, 1, 10)).toBe(10);
    });

    it("overflows on failure when fill available specified", () => {
      const store: IStorage = {
        id:EStorageCategory.BULK,
        name: "",
        available: 14,
        description: "",
        icon: "",
        reserved: {},
        stored: {},
      };
      expect(tryReserve(store, 0, 5)).toBe(true);
      expect(tryStore(store, 1, 10, true)).toBe(9);
    });
  });
});