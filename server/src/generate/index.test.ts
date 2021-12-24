import { EStorageCategory } from "shared";
import { default as generate, IResources } from ".";

describe("generate", () => {

  it("generates items", () => {
    const expected: IResources = {
      items: [
        {
          id: 0,
          description: "wood is used as an inefficient fuel or part of more complex constructions.",
          icon: "",
          name: "wood",
          storageCategory: EStorageCategory.BULK,
        },
        {
          id: 1,
          description: "coal is used as an efficient fuel.",
          icon: "",
          name: "coal",
          storageCategory: EStorageCategory.BULK,
        },
        {
          id: 2,
          description: "Tin ore the precursor to its more processed and useful form",
          icon: "",
          name: "Tin ore",
          storageCategory: EStorageCategory.BULK,
        },
        {
          id: 3,
          description: "A Tin ingot is ready to be processed into more advanced goods",
          icon: "",
          name: "Tin ingot",
          storageCategory: EStorageCategory.MANUFACTURED,
        },
      ],
      production: [
        {
          id: 0,
          description: "",
          icon: "",
          name: "",
          amount: 0,
          consumption: [],
          output: [],
          time: 0,
          progress: 0,
        },
        {
          id: 1,
          description: "",
          icon: "",
          name: "",
          amount: 0,
          consumption: [],
          output: [],
          time: 0,
          progress: 0,
        },
        {
          id: 2,
          description: "",
          icon: "",
          name: "",
          amount: 0,
          consumption: [],
          output: [[2, 1]],
          time: 0,
          progress: 0,
        },
        {
          id: 3,
          description: "",
          icon: "",
          name: "",
          amount: 0,
          consumption: [],
          output: [],
          time: 0,
          progress: 0,
        }
      ],
    };
    expect(generate({
      tin: {
        value: 1,
        burn: "wood",
        tool: "wood",
        luxury: {},
        overrides: {
          generation: {
            itemName: "Tin ore",
          },
          refinement: {
            itemName: "Tin ingot",
            itemDescription: "A {{this}} is ready to be processed into more advanced goods",
            storageCategory: 2,
          }
        },
        resource: "Tin",
      },
    },
      {
        generation: {
          storageCategory: 1,
          time: 0,
          value: 0,
          itemDescription: "{{this}} the precursor to its more processed and useful form",
          input: [],
          output: [["{{item}}", 1]],

          producerName: "",
          itemName: "",
          producerDescription: "",
        },
        refinement: {
          storageCategory: 1,
          time: 0,
          value: 0,
          itemDescription: "should not show",
          input: [],
          output: [],

          producerName: "",
          itemName: "",
          producerDescription: "",
        },
      },
      {
        ancient: {
          value: 1,
          overrides: {
            burn: {
              itemName: "coal",
            }
          },
          name: "ancient"
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
          itemName: "wood",
          producerDescription: "",
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
      })).toStrictEqual(expected);
  });
});