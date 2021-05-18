import React from "react";
import App from "./App.js";
import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  resolver: {
    FlashCards: {
      _deleted: flashcard => Boolean(flashcard._deleted)
    }
  },
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

