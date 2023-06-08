const { gql } = require("apollo-server-express")

// Define GraphQL schema
const typeDefs = gql`
  type Tip {
    id: ID!
    recipient: String!
    amount: Float!
  }

  type Query {
    hello: String
    getTip(id: ID!): Tip
  }

  type Mutation {
    createTip(recipient: String!, amount: Float!): Tip
  }
`;

module.exports = typeDefs;