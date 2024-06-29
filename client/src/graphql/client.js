// graphql/client.js

import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://ibnu-adem-27.hasura.app/v1/graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache()
});

export default client;
