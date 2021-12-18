import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express"
import { Server } from "http";
import { Express } from "express";
import { typeDefs } from "shared";

import { readFile } from "fs/promises";
import generate, { IResources } from "./generate";
import source from "./source";

export default async (app: Express, httpServer: Server) => {
  const getItems = await source<IResources>(["./data/epoch.json", "./data/tier.json", "./data/epochItems.json", "./data/tierItems.json"], async () => {
    const epoch = JSON.parse((await readFile("./data/epoch.json")).toString());
    const epochItems = JSON.parse((await readFile("./data/epochItems.json")).toString());
    const tier = JSON.parse((await readFile("./data/tier.json")).toString());
    const tierItems = JSON.parse((await readFile("./data/tierItems.json")).toString());
    return generate(tier, tierItems, epoch, epochItems);
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