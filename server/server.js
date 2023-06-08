const express = require('express');
const tipRoutes = require('./routes/tipRoutes');
const { ApolloServer } = require('apollo-server-express');
const router = express.Router();
const authenticationMiddleware = require('./middleware/authentication');
const db = require("./config/connection")
const authRoutes = require('./routes/authRoutes');
const {typeDefs, resolvers} = require("./schema")

const PORT = process.env.PORT || 4000;

const app = express();


// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Middleware
app.use(express.json());


const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };

  startApolloServer;

// Start the Apollo Server and apply middleware to Express app
/*server.start().then(() => {
 server.applyMiddleware({ app });
});

// Routes
app.use('/api/tips', tipRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});*/
