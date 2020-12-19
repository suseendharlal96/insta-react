const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    token: String!
  }

  type Comment {
    user: String
    comment: String
  }

  type Post {
    id: ID!
    image: String!
    userId: String!
    title: String!
    likes: [String]
    comments: [Comment]
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

    # createPost: String
    createPost(image: String!, title: String!): Post!
  }
`;

module.exports = typeDefs;
