const path = require('path');
const express = require('express');
const tipRoutes = require('./routes/tipRoutes');
const { ApolloServer } = require('apollo-server-express');
const db = require("./config/connection")
const {typeDefs, resolvers} = require("./schema")

const PORT = process.env.PORT || 4000;

const app = express();

// Create Apollo Server
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  introspection: true, // enables introspection
  playground: true // enables the Playground IDE
});

// Middleware
app.use(express.json());

// Start the Apollo Server and apply middleware to Express app
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  // Routes
  app.use('/api/tips', tipRoutes);

  // Static file serving and catch-all route for React app
  // These come after all other routes/middleware
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startApolloServer();
