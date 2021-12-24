import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express"
import { Server } from "http";
import { Express } from "express";
import typeDefs from "./typeDefs";

import { readFile } from "fs/promises";
import generate, { IResources } from "./generate";
import source from "./source";

export default async (app: Express, httpServer: Server) => {
  const getItems = await source<any>(["./data/epoch.json", "./data/tier.json", "./data/epochItems.json", "./data/tierItems.json"], async () => {
    const epoch = JSON.parse((await readFile("./data/epoch.json")).toString());
    const epochItems = JSON.parse((await readFile("./data/epochItems.json")).toString());
    const tier = JSON.parse((await readFile("./data/tier.json")).toString());
    const tierItems = JSON.parse((await readFile("./data/tierItems.json")).toString());
    const {items, production} = generate(tier, tierItems, epoch, epochItems);
    const out = {
      items,
      production: production.map(({output, consumption, ...rest}) => ({
        ...rest,
        consumption: Object.values(consumption).map((value) => ({
          key: value[0],
          value: value[1],
        })),
        output: Object.values(output).map((value) => ({
          key: value[0],
          value: value[1],
        })),
      })),
    };
    return out;
  });
  const resolvers = {
    Query: {
      resources: () => getItems(),
    }
  };
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  return async (port: number) => {
    await new Promise<void>(resolve => httpServer.listen({ port: port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  }
}