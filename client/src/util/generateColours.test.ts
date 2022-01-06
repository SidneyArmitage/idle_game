import { interpolate, interpolate3, interpolateVia, interpolateVia3 } from "./generateColours";

describe ("interpolate", () => {

  it("returns an array of the specified length", () => {
    expect(interpolate(2)).toHaveLength(2);
  });

  it("returns colours evenly distributed along the length when odd", () => {
    expect(interpolate(3).map(Math.floor)).toStrictEqual([
      170,
      85,
      0,
    ]);
  });

  it("returns colours evenly distributed along the length when even", () => {
    expect(interpolate(4).map(Math.floor)).toStrictEqual([
      191,
      127,
      63,
      0,
    ]);
  });

  it("offset is effective", () => {
    expect(interpolate(3, 245, 10).map(Math.floor)).toStrictEqual([
      166,
      88,
      10,
    ]);
  });
  
  it("runs", () => {
    expect(interpolate(3).map(Math.floor)).toStrictEqual([
      170,
      85,
      0,
    ]);
  });

  it("runs with a distance of 1", () => {
    expect(interpolate(1)).toStrictEqual([
      0,
    ]);
  });
});

describe("interpolate via", () => {

  it("interpolates", () => {
    expect(interpolateVia([
      [1, 0xFF],
      [1, 0xFF00],
      [1, 0xFF0000]
    ])).toStrictEqual([
      0xFF,
      0xFF00,
      0xFF0000,
    ]);
  });

});

describe("interpolate3", () => {
  
  it("it interpolates on x", () => {
    expect(interpolate3(3, [255, 0, 0])).toStrictEqual([
      [170, 0, 0],
      [85, 0, 0],
      [0, 0, 0],
    ]);
  });

  it("interpolates on y", () => {
    expect(interpolate3(3, [0, 255, 0])).toStrictEqual([
      [0, 170, 0],
      [0, 85, 0],
      [0, 0, 0],
    ]);
  });
  

  it("interpolates on x and y", () => {
    expect(interpolate3(3, [255, 255, 0])).toStrictEqual([
      [170, 170, 0],
      [85, 85, 0],
      [0, 0, 0],
    ]);
  });

});

describe("interpolate via 3", () => {
  it("works", () => {
    expect(interpolateVia3([[3, [255, 0, 0]], [3, [255, 255, 0]]])).toStrictEqual([
      [85, 0, 0],
      [170, 0, 0],
      [255, 0, 0],
      [255, 85, 0],
      [255, 170, 0],
      [255, 255, 0],
    ]);
  });
});