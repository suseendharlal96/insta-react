const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs.js");
const resolvers = require("./graphql/resolvers/index.js");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

const PORT = process.env.PORT || 5000;
const mongooseUri =
  "mongodb+srv://suseendhar:susee123@cluster0.iwva7.mongodb.net/insta-clone?retryWrites=true&w=majority";

mongoose
  .connect(mongooseUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongoose connected");
    server.listen({ port: PORT }).then(({ url }) => {
      console.log(`running on ${url}`);
    });
  });
