import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

if (process.env.NODE_ENV === 'development') {

  const { worker } = require('./dev/mocks/browser');

  worker.start();

}

const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
