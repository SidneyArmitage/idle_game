import { graphql } from "msw";
import resources from "./resources";
// const local = graphql.link("/api")

export const handlers = [
  graphql.query("resources", (req, res, ctx) => {
    return res(
      ctx.data({
        "resources": resources,
      }),
    );
  }),
];