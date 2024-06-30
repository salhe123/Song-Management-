
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://charmed-kiwi-73.hasura.app/v1/graphql', // Your GraphQL endpoint
    headers: {
      'x-hasura-admin-secret': "DhbokAYFrSxyrH7eo773GTFjyDw5nTcjvw20zP9Wk4aywgY8kVdRxe4NbUR6PLX2", // Your Hasura admin secret
    }
  }),
  cache: new InMemoryCache()
});

export default client;
