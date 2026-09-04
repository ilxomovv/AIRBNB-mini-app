import { InMemoryCache } from "@apollo/client";
import { createHttpLink } from "@apollo/client";
import { HttpLink } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://react-groups-final-project-backend.onrender.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem("authStore"))?.state
    ?.accessToken;

  return {
    headers: { ...headers, authorization: token ? `Bearer ${token}` : "" },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
