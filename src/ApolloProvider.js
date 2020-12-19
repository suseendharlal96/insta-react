import {
  ApolloProvider as Provider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "apollo-link-context";

import App from "./App";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

const authLink = setContext(() => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}` || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const ApolloProvider = () => (
  <Provider client={client}>
    <App />
  </Provider>
);

export default ApolloProvider;
