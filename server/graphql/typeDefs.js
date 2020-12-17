const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    token: String!
  }

  type Query {
    signin(name: String!, password: String!): User
  }

  type Mutation {
    signup(
      email: String!
      password: String!
      confirmPassword: String!
      username: String!
    ): User
  }
`;

module.exports = typeDefs;
