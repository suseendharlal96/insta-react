import {
  ApolloProvider as Provider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "apollo-link-context";
import { createUploadLink } from "apollo-upload-client";

import App from "./App";

const httpLink = createHttpLink({
  uri: "https://instacard-react.herokuapp.com/graphql",
});

const uploadLink = createUploadLink({
  uri: "https://instacard-react.herokuapp.com/graphql",
});

const authLink = setContext(() => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}` || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink).concat(httpLink),
  cache: new InMemoryCache(),
});

const ApolloProvider = () => (
  <Provider client={client}>
    <App />
  </Provider>
);

export default ApolloProvider;
