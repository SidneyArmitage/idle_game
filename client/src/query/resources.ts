import { gql } from "@apollo/client";

export const query = gql`
query resources {
  resources {
    items {
      storageCategory
      description
      name
      id
      icon
    }
    production {
      consumption {
        key
        value
      }
      output {
        key
        value
      }
      description
      name
      time
      progress
      id
      icon
      amount
    }
  }
}
`;