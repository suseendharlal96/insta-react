const userResolver = require("./user");
const postResolver = require("./post");

const resolvers = {
  Query: {
    ...userResolver.Query,
    ...postResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
  },
};

module.exports = resolvers;
