import { IProduction } from "shared";

export default [
  {
    description: "Stone is mined here",
    name: "Stone Quarry",
    id: 0,
    icon: "",
    consumption: [],
    output: [[1, 1]],
    time: 10,
    progress: 0,
    amount: 0,
  },
  {
    description: "Cuts logs down to size",
    name: "Saw-mill",
    id: 1,
    icon: "",
    consumption: [[0, 1]],
    output: [[4, 4]],
    time: 10,
    progress: 0,
    amount: 0,
  },
  {
    description: "Jack cuts down the trees",
    name: "Lumber-jack",
    id: 2,
    icon: "",
    consumption: [],
    output: [[0, 1]],
    time: 8,
    progress: 0,
    amount: 0,
  },
] as IProduction[];