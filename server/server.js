const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config()
const typeDefs = require("./graphql/typeDefs.js");
const resolvers = require("./graphql/resolvers/index.js");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: { origin: "*" },
  context: ({ req }) => ({ req }),
});

const PORT = process.env.PORT || 5000;
const mongooseUri = process.env.MONGOOSE;

mongoose
  .connect(mongooseUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongoose connected");
    server.listen({ port: PORT }).then(({ url }) => {
      console.log(`running on ${url}`);
    });
  });
