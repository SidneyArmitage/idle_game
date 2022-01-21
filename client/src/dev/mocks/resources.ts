export default {
  items: [
    {
      storageCategory: 1,
      description: "wood is a dirty fuel and an important component of more advanced products.",
      name: "wood",
      id: 0,
      icon: "",
      __typename: "Item"
    },
    {
      storageCategory: 1,
      description: "coal is a higher tier fuel to make advanced products.",
      name: "coal",
      id: 1,
      icon: "",
      __typename: "Item"
    },
    {
      storageCategory: 4,
      description: "Idles is used to improve the standards of life for workers.",
      name: "Idles",
      id: 2,
      icon: "",
      __typename: "Item"
    },
    {
      storageCategory: 1,
      description: "Stone is the base material for production.",
      name: "Stone",
      id: 3,
      icon: "",
      __typename: "Item"
    },
    {
      storageCategory: 2,
      description: "Stone Blocks is the primary material used to make goods.",
      name: "Stone Blocks",
      id: 4,
      icon: "",
      __typename: "Item"
    },
    {
      storageCategory: 2,
      description: "Stone tools increases the production rates and allows for the gathering & generation of more complex materials.",
      name: "Stone tools",
      id: 5,
      icon: "",
      __typename: "Item"
    },
    {
      storageCategory: 1,
      description: "Stone components is sold to other more advanced settlements for a profit.",
      name: "Stone components",
      id: 6,
      icon: "",
      __typename: "Item"
    },
    {
      storageCategory: 4,
      description: "Tin luxury is used to improve the standards of life for workers.",
      name: "Tin luxury",
      id: 7,
      icon: "",
      __typename: "Item"
    },
    {
      storageCategory: 1,
      description: "Tin Mine is the base material for production.",
      name: "Tin Mine",
      id: 8,
      icon: "",
      __typename: "Item"
    },
    {
      storageCategory: 2,
      description: "Tin ingot is the primary material used to make goods.",
      name: "Tin ingot",
      id: 9,
      icon: "",
      __typename: "Item"
    },
    {
      storageCategory: 2,
      description: "Tin tools increases the production rates and allows for the gathering & generation of more complex materials.",
      name: "Tin tools",
      id: 10,
      icon: "",
      __typename: "Item"
    },
    {
      storageCategory: 1,
      description: "Tin components is sold to other more advanced settlements for a profit.",
      name: "Tin components",
      id: 11,
      icon: "",
      __typename: "Item"
    }
  ],
  production: [
    {
      "__typename": "Production",
      "consumption": [],
      "output": [
        {
          "__typename": "Tuple",
          "key": 0,
          "value": 1
        }
      ],
      "description": " produces wood to be used as a dirty fuel and to make more advanced products.",
      "name": "Lumber jack",
      "amount": 1,
      "time": 1,
      "progress": 0,
      "id": 0,
      "icon": ""
    },
    {
      "__typename": "Production",
      "consumption": [],
      "output": [
        {
          "__typename": "Tuple",
          "key": 1,
          "value": 1
        }
      ],
      "description": "coal mine produces coal which is a higher tier fuel to make advanced products.",
      "name": "coal mine",
      "amount": 0,
      "time": 1,
      "progress": 0,
      "id": 1,
      "icon": ""
    },
    {
      "__typename": "Production",
      "consumption": [
        {
          "key": 4,
          "value": 1,
          "__typename": "Tuple"
        },
        {
          "key": 0,
          "value": 1,
          "__typename": "Tuple"
        }
      ],
      "output": [
        {
          "__typename": "Tuple",
          "key": 2,
          "value": 1
        }
      ],
      "description": "A hard working Sculptor produces Idles to improve quality of life.",
      "name": "Sculptor",
      "amount": 0,
      "time": 1,
      "progress": 0,
      "id": 2,
      "icon": ""
    },
    {
      "__typename": "Production",
      "consumption": [],
      "output": [
        {
          "__typename": "Tuple",
          "key": 3,
          "value": 1
        }
      ],
      "description": "A hard working Quarry produces Stone to be further refined and power the economy.",
      "name": "Quarry",
      "amount": 0,
      "time": 1,
      "progress": 0,
      "id": 3,
      "icon": ""
    },
    {
      "__typename": "Production",
      "consumption": [
        {
          "key": 3,
          "value": 1,
          "__typename": "Tuple"
        },
        {
          "key": 1,
          "value": 1,
          "__typename": "Tuple"
        }
      ],
      "output": [
        {
          "__typename": "Tuple",
          "key": 4,
          "value": 1
        }
      ],
      "description": "A hard working Stone mason produces Stone Blocks to build more complex goods and items.",
      "name": "Stone mason",
      "amount": 0,
      "time": 1,
      "progress": 0,
      "id": 4,
      "icon": ""
    },
    {
      "__typename": "Production",
      "consumption": [
        {
          "key": 4,
          "value": 1,
          "__typename": "Tuple"
        },
        {
          "key": 0,
          "value": 2,
          "__typename": "Tuple"
        }
      ],
      "output": [
        {
          "__typename": "Tuple",
          "key": 5,
          "value": 1
        }
      ],
      "description": "A hard working Stone tool smith produces Stone tools to manufacture more complex goods.",
      "name": "Stone tool smith",
      "amount": 0,
      "time": 1,
      "progress": 0,
      "id": 5,
      "icon": ""
    },
    {
      "__typename": "Production",
      "consumption": [
        {
          "key": 4,
          "value": 1,
          "__typename": "Tuple"
        },
        {
          "key": 0,
          "value": 1,
          "__typename": "Tuple"
        }
      ],
      "output": [
        {
          "__typename": "Tuple",
          "key": 6,
          "value": 2
        }
      ],
      "description": "A hard working Stone artisan produces Stone components for sale to other markets.",
      "name": "Stone artisan",
      "amount": 0,
      "time": 1,
      "progress": 0,
      "id": 6,
      "icon": ""
    },
    {
      "__typename": "Production",
      "consumption": [
        {
          "key": 9,
          "value": 1,
          "__typename": "Tuple"
        },
        {
          "key": 0,
          "value": 1,
          "__typename": "Tuple"
        }
      ],
      "output": [
        {
          "__typename": "Tuple",
          "key": 7,
          "value": 1
        }
      ],
      "description": "A hard working Tin artisan produces Tin luxury to improve quality of life.",
      "name": "Tin artisan",
      "amount": 0,
      "time": 1,
      "progress": 0,
      "id": 7,
      "icon": ""
    },
    {
      "__typename": "Production",
      "consumption": [],
      "output": [
        {
          "__typename": "Tuple",
          "key": 8,
          "value": 1
        }
      ],
      "description": "A hard working Tin Mine produces Tin Ingot to be further refined and power the economy.",
      "name": "Tin Mine",
      "amount": 0,
      "time": 1,
      "progress": 0,
      "id": 8,
      "icon": ""
    },
    {
      "__typename": "Production",
      "consumption": [
        {
          "key": 8,
          "value": 1,
          "__typename": "Tuple"
        },
        {
          "key": 1,
          "value": 1,
          "__typename": "Tuple"
        }
      ],
      "output": [
        {
          "__typename": "Tuple",
          "key": 9,
          "value": 1
        }
      ],
      "description": "A hard working Tin smith produces Tin ingot to build more complex goods and items.",
      "name": "Tin smith",
      "amount": 0,
      "time": 1,
      "progress": 0,
      "id": 9,
      "icon": ""
    },
    {
      "__typename": "Production",
      "consumption": [
        {
          "key": 9,
          "value": 1,
          "__typename": "Tuple"
        },
        {
          "key": 0,
          "value": 2,
          "__typename": "Tuple"
        }
      ],
      "output": [
        {
          "__typename": "Tuple",
          "key": 10,
          "value": 1
        }
      ],
      "description": "A hard working Tin tool smith produces Tin tools to manufacture more complex goods.",
      "name": "Tin tool smith",
      "amount": 0,
      "time": 1,
      "progress": 0,
      "id": 10,
      "icon": ""
    },
    {
      "__typename": "Production",
      "consumption": [
        {
          "key": 9,
          "value": 1,
          "__typename": "Tuple"
        },
        {
          "key": 0,
          "value": 1,
          "__typename": "Tuple"
        }
      ],
      "output": [
        {
          "__typename": "Tuple",
          "key": 11,
          "value": 2
        }
      ],
      "description": "A hard working Tin artisan produces Tin components for sale to other markets.",
      "name": "Tin artisan",
      "amount": 0,
      "time": 1,
      "progress": 0,
      "id": 11,
      "icon": ""
    }
  ],
  __typename: "Resources"
}