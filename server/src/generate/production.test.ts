import { IProduction } from "shared";
import { createEpochProducers, createProducer, createTierProducers, default as createProducers, getItemName } from "./production";

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
      time: 1,
      progress: 0,
    };
    expect(createProducer("LumberJack", 0, "test", "", [["0", 2]], "", [], 1, "", { "0": 0 })).toStrictEqual(expected);
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
    expect(createProducer("LumberJack", 0, "test", "", [["0", 2]], "", [["1", 2]], 0, "", { "0": 0, "1": 1 })).toStrictEqual(expected);
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
    expect(createProducer("LumberJack", 0, "A hard working {{this}} produces", "", [["0", 2]], "", [], 0, "", { "0": 0 })).toStrictEqual(expected);
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
    expect(createProducer("LumberJack", 0, "A hard working {{this}} produces {{item}}", "", [["0", 2]], "wood", [], 0, "", { "0": 0 })).toStrictEqual(expected);
  });

  it("uses the relative specification for a resource", () => {
    const expected: IProduction = {
      id: 0,
      description: "test",
      icon: "",
      name: "LumberJack",
      amount: 0,
      consumption: [],
      output: [[0, 2]],
      time: 1,
      progress: 0,
    };
    expect(createProducer("LumberJack", 0, "test", "", [["0", 2]], "", [], 1, "1", { "1-0": 0 })).toStrictEqual(expected);
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
      burn: "wood",
      tool: "wood",
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
        itemDescription: "",
        producerName: "",
        itemName: "",
      },
    }, {
      "Tin": 0,
      "Tin-generation": 0,
    }, 0
    )).toStrictEqual([1, expected]);
  });

  it("creates a producer with an output", () => {
    const expected: IProduction[] = [
      {
        id: 0,
        description: "Hard workers at a Tin mine produces Tin",
        icon: "",
        name: "Tin mine",
        amount: 0,
        consumption: [],
        output: [[0, 2]],
        time: 0,
        progress: 0,
      }
    ];
    expect(createTierProducers({
      value: 1,
      burn: "wood",
      tool: "wood",
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
        output: [["{{item}}", 2]],

        producerName: "",
        itemName: "",
        itemDescription: "",
      },
    },
      {
        "Tin": 0,
        "Tin-generation": 0,
      },
      0
    )).toStrictEqual([1, expected]);
  });

  it("overrides Consumption a producer with an output", () => {
    const expected: IProduction[] = [
      {
        id: 0,
        description: "Hard workers at a Tin mine produces Tin",
        icon: "",
        name: "Tin mine",
        amount: 0,
        consumption: [[1, 1]],
        output: [[0, 2]],
        time: 0,
        progress: 0,
      }
    ];
    expect(createTierProducers({
      value: 1,
      burn: "wood",
      tool: "wood",
      luxury: {},
      overrides: {
        generation: {
          producerName: "Tin mine",
          input: [["wood", 1]],
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
        output: [["{{item}}", 2]],

        producerName: "",
        itemName: "",
        itemDescription: "",
      },
    },
      {
        "Tin": 0,
        "Tin-generation": 0,
        "wood": 1,
      },
      0
    )).toStrictEqual([1, expected]);
  });

  it("Creates a producer with overridden outputs", () => {
    const expected: IProduction[] = [
      {
        id: 0,
        description: "Hard workers at a Tin mine produces Tin ore",
        icon: "",
        name: "Tin mine",
        amount: 0,
        consumption: [[1, 1]],
        output: [[0, 2]],
        time: 0,
        progress: 0,
      },
      {
        id: 1,
        description: "Hard workers at a Tin smith produces Tin ingot",
        icon: "",
        name: "Tin smith",
        amount: 0,
        consumption: [[0, 1]],
        output: [[2, 2]],
        time: 0,
        progress: 0,
      }
    ];
    expect(createTierProducers({
      value: 1,
      burn: "wood",
      tool: "wood",
      luxury: {},
      overrides: {
        generation: {
          producerName: "Tin mine",
          input: [["wood", 1]],
          itemName: "Tin ore"
        },
        refinement: {
          producerName: "Tin smith",
          itemName: "Tin ingot"
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
        output: [["{{item}}", 2]],

        producerName: "",
        itemName: "",
        itemDescription: "",
      },
      refinement: {
        storageCategory: 1,
        time: 0,
        value: 0,
        producerDescription: "Hard workers at a {{this}} produces {{item}}",
        input: [["generation", 1]],
        output: [["{{item}}", 2]],

        producerName: "",
        itemName: "",
        itemDescription: "",
      },
    },
      {
        "Tin-generation": 0,
        "Tin ore": 0,
        "wood": 1,
        "Tin ingot": 2,
        "Tin-refinement": 2,
      },
      0
    )).toStrictEqual([2, expected]);
  });

  it("Creates an empty producer with an overridden name", () => {
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
      burn: "wood",
      tool: "wood",
      luxury: {},
      overrides: {
        generation: {
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
        itemDescription: "",
        producerName: "{{resource}} mine",
        itemName: "{{resource}}",
      },
    }, {
      "Tin": 0,
      "Tin-generation": 0,
    }, 0
    )).toStrictEqual([1, expected]);
  });
  
  it("Derives the item name", () => {
    const expected: IProduction[] = [
      {
        id: 0,
        description: "Hard workers at a Tin mine produces Tin ore",
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
      burn: "wood",
      tool: "wood",
      luxury: {},
      overrides: {
        generation: {
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
        itemDescription: "",
        producerName: "{{resource}} mine",
        itemName: "{{resource}}",
      },
    }, {
      "Tin ore": 0,
      "Tin-generation": 0,
    }, 0
    )).toStrictEqual([1, expected]);
  });

  it("Creates a producer with a defined burn input", () => {
    const expected: IProduction[] = [
      {
        id: 0,
        description: "Hard workers at a Tin mine produces Tin ore",
        icon: "",
        name: "Tin mine",
        amount: 0,
        consumption: [[1, 1]],
        output: [[0, 2]],
        time: 0,
        progress: 0,
      },
      {
        id: 1,
        description: "Hard workers at a Tin smith produces Tin ingot",
        icon: "",
        name: "Tin smith",
        amount: 0,
        consumption: [[0, 1]],
        output: [[2, 2]],
        time: 0,
        progress: 0,
      }
    ];
    expect(createTierProducers({
      value: 1,
      burn: "wood",
      tool: "wood",
      luxury: {},
      overrides: {
        generation: {
          producerName: "Tin mine",
          itemName: "Tin ore"
        },
        refinement: {
          producerName: "Tin smith",
          itemName: "Tin ingot"
        },
      },
      resource: "Tin",
    }, {
      generation: {
        storageCategory: 1,
        time: 0,
        value: 0,
        producerDescription: "Hard workers at a {{this}} produces {{item}}",
        input: [["wood", 1]],
        output: [["{{item}}", 2]],

        producerName: "",
        itemName: "",
        itemDescription: "",
      },
      refinement: {
        storageCategory: 1,
        time: 0,
        value: 0,
        producerDescription: "Hard workers at a {{this}} produces {{item}}",
        input: [["generation", 1]],
        output: [["{{item}}", 2]],

        producerName: "",
        itemName: "",
        itemDescription: "",
      },
    },
      {
        "Tin-generation": 0,
        "Tin ore": 0,
        "wood": 1,
        "Tin ingot": 2,
        "Tin-refinement": 2,
      },
      0
    )).toStrictEqual([2, expected]);
  });
});

describe("create epoch producers", () => {
  it("creates wood and burn", () => {
    const output: IProduction[] = [
      {
        id: 0,
        description: "Provides wood to facilitate progress.",
        icon: "",
        name: "LumberJack",
        amount: 0,
        consumption: [],
        time: 0,
        output: [],
        progress: 0,
      },
      {
        id: 1,
        description: "Mines coal for progress.",
        icon: "",
        name: "coal mine",
        amount: 0,
        consumption: [],
        time: 0,
        output: [],
        progress: 0,
      },
    ];
    expect(createEpochProducers({
      value: 1,
      name: "default",
      overrides: {
        burn: {
          itemName: "coal",
          producerName: "coal mine",
          producerDescription: "Mines coal for progress.",
        },
        wood: {
          producerName: "LumberJack",
        }
      },
    },
      {
        wood: {
          time: 1,
          value: 1,
          storageCategory: 1,
          itemDescription: "{{this}} is used as an inefficient fuel or part of more complex constructions.",
          input: [],
          output: [],

          producerName: "",
          itemName: "",
          producerDescription: "Provides {{item}} to facilitate progress.",
        },
        burn: {
          time: 2,
          value: 2,
          storageCategory: 1,
          itemDescription: "{{this}} is used as an efficient fuel.",
          input: [],
          output: [],

          producerName: "",
          itemName: "",
          producerDescription: "",
        }
      }, {
      "default-wood": 0,
      "default-coal": 1,
    }, 0)).toStrictEqual([2, output]);
  });


  it("creates wood and burn and is named using the item", () => {
    const output: IProduction[] = [
      {
        id: 0,
        description: "Provides wood to facilitate progress.",
        icon: "",
        name: "LumberJack",
        amount: 0,
        consumption: [],
        time: 0,
        output: [],
        progress: 0,
      },
      {
        id: 1,
        description: "Mines coal for progress.",
        icon: "",
        name: "coal mine",
        amount: 0,
        consumption: [],
        time: 0,
        output: [],
        progress: 0,
      },
    ];
    expect(createEpochProducers({
      value: 1,
      name: "default",
      overrides: {
        burn: {
          itemName: "coal",
          producerDescription: "Mines coal for progress.",
        },
        wood: {
          producerName: "LumberJack",
        }
      },
    },
      {
        wood: {
          time: 1,
          value: 1,
          storageCategory: 1,
          itemDescription: "{{this}} is used as an inefficient fuel or part of more complex constructions.",
          input: [],
          output: [],
          producerName: "",
          itemName: "",
          producerDescription: "Provides {{item}} to facilitate progress.",
        },
        burn: {
          time: 2,
          value: 2,
          storageCategory: 1,
          itemDescription: "{{this}} is used as an efficient fuel.",
          input: [],
          output: [],
          producerName: "{{item}} mine",
          itemName: "",
          producerDescription: "",
        }
      }, {
      "default-wood": 0,
      "wood": 0,
      "default-burn": 1,
      "coal": 1,
    }, 0)).toStrictEqual([2, output]);
  });

});

describe("generate producers (default)", () => {
  it("works", () => {
    const expected: IProduction[] = [
      {
        id: 0,
        description: "Provides wood to facilitate progress.",
        icon: "",
        name: "LumberJack",
        amount: 0,
        consumption: [],
        time: 0,
        output: [],
        progress: 0,
      },
      {
        id: 1,
        description: "Mines coal for progress.",
        icon: "",
        name: "coal mine",
        amount: 0,
        consumption: [],
        time: 0,
        output: [],
        progress: 0,
      },
      {
        id: 2,
        description: "Hard workers at a Tin mine produces Tin",
        icon: "",
        name: "Tin mine",
        amount: 0,
        consumption: [],
        output: [[2, 2]],
        time: 0,
        progress: 0,
      },
    ];
    expect(createProducers({
      "tin": {
        value: 1,
        burn: "wood",
        tool: "wood",
        luxury: {},
        overrides: {
          generation: {
            producerName: "Tin mine",
            input: [],
          },
        },
        resource: "Tin",
      }
    },
      {
        generation: {
          storageCategory: 1,
          time: 0,
          value: 0,
          producerDescription: "Hard workers at a {{this}} produces {{item}}",
          input: [],
          output: [["{{item}}", 2]],

          producerName: "",
          itemName: "",
          itemDescription: "",
        },
      },
      {
        "primordial": {
          value: 1,
          name: "primordial",
          overrides: {
            burn: {
              itemName: "coal",
              producerName: "coal mine",
              producerDescription: "Mines coal for progress.",
            },
            wood: {
              producerName: "LumberJack",
            }
          },
        }
      },
      {
        wood: {
          time: 1,
          value: 1,
          storageCategory: 1,
          itemDescription: "{{this}} is used as an inefficient fuel or part of more complex constructions.",
          input: [],
          output: [],

          producerName: "",
          itemName: "",
          producerDescription: "Provides {{item}} to facilitate progress.",
        },
        burn: {
          time: 2,
          value: 2,
          storageCategory: 1,
          itemDescription: "{{this}} is used as an efficient fuel.",
          input: [],
          output: [],

          producerName: "",
          itemName: "",
          producerDescription: "",
        }
      },
      {
        "wood": 0,
        "coal": 1,
        "Tin": 2,
        "Tin-generation": 2,
      })).toStrictEqual(expected);
  });

  it("transforms epoch items for input", () => {
    const expected: IProduction[] = [
      {
        id: 0,
        description: "Provides wood to facilitate progress.",
        icon: "",
        name: "LumberJack",
        amount: 0,
        consumption: [],
        time: 0,
        output: [],
        progress: 0,
      },
      {
        id: 1,
        description: "Mines coal for progress.",
        icon: "",
        name: "coal mine",
        amount: 0,
        consumption: [],
        time: 0,
        output: [],
        progress: 0,
      },
      {
        id: 2,
        description: "Hard workers at a Tin mine produces Tin",
        icon: "",
        name: "Tin mine",
        amount: 0,
        consumption: [[0, 1]],
        output: [[2, 2]],
        time: 0,
        progress: 0,
      },
    ];
    expect(createProducers({
      "tin": {
        value: 1,
        burn: "wood",
        tool: "wood",
        luxury: {},
        overrides: {
          generation: {
            producerName: "Tin mine",
          },
        },
        resource: "Tin",
      }
    },
      {
        generation: {
          storageCategory: 1,
          time: 0,
          value: 0,
          producerDescription: "Hard workers at a {{this}} produces {{item}}",
          input: [["{{burn}}", 1]],
          output: [["{{item}}", 2]],
          producerName: "",
          itemName: "",
          itemDescription: "",
        },
      },
      {
        "primordial": {
          value: 1,
          name: "primordial",
          overrides: {
            burn: {
              itemName: "coal",
              producerName: "coal mine",
              producerDescription: "Mines coal for progress.",
            },
            wood: {
              producerName: "LumberJack",
            }
          },
        }
      },
      {
        wood: {
          time: 1,
          value: 1,
          storageCategory: 1,
          itemDescription: "{{this}} is used as an inefficient fuel or part of more complex constructions.",
          input: [],
          output: [],

          producerName: "",
          itemName: "",
          producerDescription: "Provides {{item}} to facilitate progress.",
        },
        burn: {
          time: 2,
          value: 2,
          storageCategory: 1,
          itemDescription: "{{this}} is used as an efficient fuel.",
          input: [],
          output: [],

          producerName: "",
          itemName: "",
          producerDescription: "",
        }
      },
      {
        "wood": 0,
        "primordial-wood": 0,
        "primordial-burn": 0,
        "coal": 1,
        "Tin": 2,
        "Tin-generation": 2,
      })).toStrictEqual(expected);
  });
});

describe("get Item Name", () => {

  it("returns its self by default", () => {
    expect(getItemName("one", {
      "one": 1,
    })).toBe("one");
  });

  it("does not return itself", () => {
    expect(getItemName("one", {
      "one": 1,
      "next": 1,
    })).toBe("next");
  });

});