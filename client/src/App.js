import React from 'react';
import TipCreator from './components/TipCreator';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const localHttpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const remoteHttpLink = createHttpLink({
  uri: 'https://mytipjar.herokuapp.com/graphql',
});

const httpLink = process.env.NODE_ENV === 'production'
  ? remoteHttpLink
  : localHttpLink;

// Create an Apollo Link that adds the Authorization header with the JWT token
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <TipCreator />
    </div>
    </ApolloProvider>
  );
}

export default App;
