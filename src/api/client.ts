import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';
import localforage from 'localforage';

const client = new ApolloClient({
  uri: `${localStorage.getItem('endpoint') ?? ''}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
