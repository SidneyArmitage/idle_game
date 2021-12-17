import { ApolloServerPluginDrainHttpServer, gql } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express"
import { Server } from "http";
import { Express } from "express";

export default async (app: Express, httpServer: Server) => {
  const typeDefs: any = gql`
  #schema
  type Query {
    id: Int
  }
  `;
  const resolvers = {};
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