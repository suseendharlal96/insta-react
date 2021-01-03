const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    token: String!
    profile: String!
  }

  type Comment {
    user: String
    comment: String
    date: String
  }

  type Post {
    _id: ID
    image: String
    userId: String
    title: String
    likes: [String]
    userprofile: String
    comments: [Comment]
    createdAt: String
  }

  type Query {
    signin(name: String!, password: String!): User
    getPosts: [Post]!
  }

  type Mutation {
    signup(
      email: String!
      password: String!
      confirmPassword: String!
      username: String!
      profile: Upload!
    ): User

    createPost(file: Upload!, title: String!): Post

    likeUnlikePost(postId: String!): Post

    commentPost(postId: String!, comment: String!): Post
  }
`;

module.exports = typeDefs;
