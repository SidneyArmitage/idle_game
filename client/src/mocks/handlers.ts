import { graphql } from "msw";
// const local = graphql.link("/api")

export const handlers = [
  graphql.query("resources", (req, res, ctx) => {
    return res(
      ctx.data({
        "resources": {
          "items": [
            {
              "storageCategory": 1,
              "description": "wood is a dirty fuel and an important component of more advanced products.",
              "name": "wood",
              "id": 0,
              "icon": "",
              "__typename": "Item"
            },
            {
              "storageCategory": 1,
              "description": "coal is a higher tier fuel to make advanced products.",
              "name": "coal",
              "id": 1,
              "icon": "",
              "__typename": "Item"
            },
            {
              "storageCategory": 4,
              "description": "Idles is used to improve the standards of life for workers.",
              "name": "Idles",
              "id": 2,
              "icon": "",
              "__typename": "Item"
            },
            {
              "storageCategory": 1,
              "description": "Stone is the base material for production.",
              "name": "Stone",
              "id": 3,
              "icon": "",
              "__typename": "Item"
            },
            {
              "storageCategory": 2,
              "description": "Stone Blocks is the primary material used to make goods.",
              "name": "Stone Blocks",
              "id": 4,
              "icon": "",
              "__typename": "Item"
            },
            {
              "storageCategory": 2,
              "description": "Stone tools increases the production rates and allows for the gathering & generation of more complex materials.",
              "name": "Stone tools",
              "id": 5,
              "icon": "",
              "__typename": "Item"
            },
            {
              "storageCategory": 1,
              "description": "Stone components is sold to other more advanced settlements for a profit.",
              "name": "Stone components",
              "id": 6,
              "icon": "",
              "__typename": "Item"
            },
            {
              "storageCategory": 4,
              "description": "Tin luxury is used to improve the standards of life for workers.",
              "name": "Tin luxury",
              "id": 7,
              "icon": "",
              "__typename": "Item"
            },
            {
              "storageCategory": 1,
              "description": "Tin Mine is the base material for production.",
              "name": "Tin Mine",
              "id": 8,
              "icon": "",
              "__typename": "Item"
            },
            {
              "storageCategory": 2,
              "description": "Tin ingot is the primary material used to make goods.",
              "name": "Tin ingot",
              "id": 9,
              "icon": "",
              "__typename": "Item"
            },
            {
              "storageCategory": 2,
              "description": "Tin tools increases the production rates and allows for the gathering & generation of more complex materials.",
              "name": "Tin tools",
              "id": 10,
              "icon": "",
              "__typename": "Item"
            },
            {
              "storageCategory": 1,
              "description": "Tin components is sold to other more advanced settlements for a profit.",
              "name": "Tin components",
              "id": 11,
              "icon": "",
              "__typename": "Item"
            }
          ],
          "__typename": "Resources"
        }
      }),
    );
  }),
];