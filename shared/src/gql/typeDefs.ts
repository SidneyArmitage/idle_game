import { gql } from "apollo-server-core";

export const typeDefs = gql`

  interface Object {
    description: String
    name: String
    id: Int
    icon: String
  }

  type Tuple {
    key: Float
    value: Float
  } 

  type Item implements Object {
    storageCategory: Int
    # object
    description: String
    name: String
    id: Int
    icon: String
  }

  type Production implements Object {
    amount: Int
    consumption: [Tuple]
    output: [Tuple]
    time: Float
    progress: Int
    # object
    description: String
    name: String
    id: Int
    icon: String
  }

  type Resources {
    item: [Item]
    production: [Production]
  }

  type Query {
    resources: Resources
  }
`;