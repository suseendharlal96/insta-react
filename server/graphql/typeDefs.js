const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    token: String!
  }

  type Query {
    signin(username: String!, password: String!): User
  }

  type Mutation {
    signup(
      username: String!
      email: String!
      password: String!
      username: String!
      confirmPassword: String!
    ): User
  }
`;

module.exports = typeDefs;
