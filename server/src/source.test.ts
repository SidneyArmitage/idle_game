import { source } from "./source";

describe("source", () => {

  it("is cached by default", async () => {
    let run = 0;
    let check = 0;
    await source<void>(() => {
      check += 1;
      return {mtimeMs: 0};
    }, [""], async () => {
      run += 1;
    });
    expect(run).toBe(1);
    expect(check).toBe(1);
  });

  it("reads the cache", async () => {
    let run = 0;
    let check = 0;
    const checker = await source(() => {
      check += 1;
      return {mtimeMs: 0};
    }, [""], async () => {
      run += 1;
    });
    await checker();
    expect(run).toBe(1);
    expect(check).toBe(2);
  });

  it("gets a new value on dirty cache", async () => {
    let run = 0;
    let check = 0;
    const checker = await source(() => {
      check += 1;
      return {mtimeMs: check};
    }, [""], async () => {
      run += 1;
    });
    await checker();
    expect(run).toBe(2);
    expect(check).toBe(2);
  });

  it("checks multiple files with no changes", async () => {
    let run = 0;
    let check = 0;
    const checker = await source(() => {
      check += 1;
      return {mtimeMs: 0};
    }, ["0", "1"], async () => {
      run += 1;
    });
    await checker();
    expect(run).toBe(1);
    expect(check).toBe(4);
  });

  it("checks multiple files with one changing", async () => {
    let run = 0;
    let check = 0;
    const checker = await source((value) => {
      check += 1;
      return {mtimeMs: value === "1" ? check : 0};
    }, ["0", "1"], async () => {
      run += 1;
    });
    await checker();
    expect(run).toBe(2);
    expect(check).toBe(4);
  });

  it("has a non-void type", async () => {
    let run = 0;
    let check = 0;
    const checker = await source<string>(() => {
      check += 1;
      return {mtimeMs: 0};
    }, [""], async () => {
      run += 1;
      return "test"
    });
    expect(await checker()).toBe("test");
    expect(run).toBe(1);
    expect(check).toBe(2);
  });

});