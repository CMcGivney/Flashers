require("dotenv").config();
const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");


const typeDefs = require("./graphql/typeDefs");
const resolvers = require('./graphql/resolvers')
const DATABASE_URL = process.env.DATABASE_URL;

const pubsub = new PubSub()


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: process.env.PORT || 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
