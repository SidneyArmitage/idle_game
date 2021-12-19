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
              "storageCategory": null,
              "description": "burn is a higher tier fuel to make advanced products.",
              "name": "burn",
              "id": 1,
              "icon": "",
              "__typename": "Item"
            },
            {
              "storageCategory": 4,
              "description": "Stone is used to improve the standards of life for workers.",
              "name": "Stone",
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
              "description": "Stone is the primary material used to make goods.",
              "name": "Stone",
              "id": 4,
              "icon": "",
              "__typename": "Item"
            },
            {
              "storageCategory": 2,
              "description": "Stone increases the production rates and allows for the gathering & generation of more complex materials.",
              "name": "Stone",
              "id": 5,
              "icon": "",
              "__typename": "Item"
            },
            {
              "storageCategory": 1,
              "description": "Stone is sold to other more advanced settlements for a profit.",
              "name": "Stone",
              "id": 6,
              "icon": "",
              "__typename": "Item"
            },
            {
              "storageCategory": 4,
              "description": "Tin is used to improve the standards of life for workers.",
              "name": "Tin",
              "id": 7,
              "icon": "",
              "__typename": "Item"
            },
            {
              "storageCategory": 1,
              "description": "Tin is the base material for production.",
              "name": "Tin",
              "id": 8,
              "icon": "",
              "__typename": "Item"
            },
            {
              "storageCategory": 2,
              "description": "Tin is the primary material used to make goods.",
              "name": "Tin",
              "id": 9,
              "icon": "",
              "__typename": "Item"
            },
            {
              "storageCategory": 2,
              "description": "Tin increases the production rates and allows for the gathering & generation of more complex materials.",
              "name": "Tin",
              "id": 10,
              "icon": "",
              "__typename": "Item"
            },
            {
              "storageCategory": 1,
              "description": "Tin is sold to other more advanced settlements for a profit.",
              "name": "Tin",
              "id": 11,
              "icon": "",
              "__typename": "Item"
            }
          ],
          "__typename": "Resources",
        },
      }),
    );
  }),
];