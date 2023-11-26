import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  from,
  HttpLink,
  ApolloLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import localforage from 'localforage';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  
  if ((graphQLErrors as any)?.[0]?.extensions?.originalError?.statusCode === 401) {
    location.href = '/login';
  }
});

const httpLink = new HttpLink({
  uri: `${localStorage.getItem('endpoint') ?? ''}/graphql`,
});

const authLink = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
