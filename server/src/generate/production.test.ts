import { IProduction } from "shared";
import { createProducer, createTierProducers } from "./production";

describe("Create Producer", () => {
  
  it("creates a basic producer", () => {
    const expected: IProduction = {
      id: 0,
      description: "test",
      icon: "",
      name: "LumberJack",
      amount: 0,
      consumption: [],
      output: [[0, 2]],
      time: 0,
      progress: 0,
    };
    expect(createProducer("LumberJack", 0, "test", "", [[0, 2]], "")).toStrictEqual(expected);
  });

  it("creates a basic producer with consumption", () => {
    const expected: IProduction = {
      id: 0,
      description: "test",
      icon: "",
      name: "LumberJack",
      amount: 0,
      consumption: [[1, 2]],
      output: [[0, 2]],
      time: 0,
      progress: 0,
    };
    expect(createProducer("LumberJack", 0, "test", "", [[0, 2]], "", [[1, 2]])).toStrictEqual(expected);
  });

  it("has a dynamic description with name", () => {
    const expected: IProduction = {
      id: 0,
      description: "A hard working LumberJack produces",
      icon: "",
      name: "LumberJack",
      amount: 0,
      consumption: [],
      output: [[0, 2]],
      time: 0,
      progress: 0,
    };
    expect(createProducer("LumberJack", 0, "A hard working {{this}} produces", "", [[0, 2]], "")).toStrictEqual(expected);
  });

  it("has a dynamic description with the item name as well", () => {
    const expected: IProduction = {
      id: 0,
      description: "A hard working LumberJack produces wood",
      icon: "",
      name: "LumberJack",
      amount: 0,
      consumption: [],
      output: [[0, 2]],
      time: 0,
      progress: 0,
    };
    expect(createProducer("LumberJack", 0, "A hard working {{this}} produces {{item}}", "", [[0, 2]], "wood")).toStrictEqual(expected);
  });

});

describe("create tier producers", () => {

  it("Creates an empty producer", () => {
    const expected: IProduction[] = [
      {
        id: 0,
        description: "Hard workers at a Tin mine produces Tin",
        icon: "",
        name: "Tin mine",
        amount: 0,
        consumption: [],
        output: [],
        time: 0,
        progress: 0,
      }
    ];
    expect(createTierProducers({
      value: 1,
      burn: ["wood"],
      tool: ["wood"],
      luxury: {},
      overrides: {
        generation: {
          producerName: "Tin mine"
        },
      },
      resource: "Tin",
    }, {
      generation: {
        storageCategory: 1,
        time: 0,
        value: 0,
        producerDescription: "Hard workers at a {{this}} produces {{item}}",
        input: [],
        output: [],
        producer: "",
        itemDescription: "",
      }, 
    }, 0
    )).toStrictEqual([1, expected]);
  });

});