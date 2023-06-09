import React from 'react';
import TipCreator from './components/TipCreator';

import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';



// Initialize Apollo Client
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
   // replace with your GraphQL server URL
});

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
