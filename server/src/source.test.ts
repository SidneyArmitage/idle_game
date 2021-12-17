import { source } from "./source";

describe("source", () => {

  it("is cached by default", async () => {
    let run = 0;
    let check = 0;
    await source(() => {
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

  it("checks multiple files", () => {
    fail("not implemented");
  });

});