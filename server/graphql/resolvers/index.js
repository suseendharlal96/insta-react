const userResolver = require("./user");
const postResolver = require("./post");

const resolvers = {
  Query: {
    ...userResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
  },
};

module.exports = resolvers;
