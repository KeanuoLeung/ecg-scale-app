import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';
import localforage from 'localforage';

const client = new ApolloClient({
  uri: `${localStorage.getItem('endpoint') ?? ''}/graphql`,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
  cache: new InMemoryCache(),
});

export default client;
