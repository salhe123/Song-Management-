import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import store from './features/songs/store';
import client from './graphql/client';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
</Provider>
  
);
