import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import "isomorphic-fetch";

const link = new HttpLink({
  uri: "https://internal.bundestag.io"
});

const cache = new InMemoryCache({});

const client = new ApolloClient({
  link,
  cache,
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache"
    }
  }
});

export default client;
