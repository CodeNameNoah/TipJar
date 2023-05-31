const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const tipRoutes = require('./routes/tipRoutes');
//const authenticationMiddleware = require('./middleware/authentication');
const { ApolloServer, gql } = require('apollo-server-express');
const Tip = require('./models/Tip'); // import your Mongoose Tip model

// Connect to MongoDB using Mongoose
mongoose
  .connect('mongodb://localhost:27017/tip-creator', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const app = express();

// Define GraphQL schema
const typeDefs = gql`
  type Tip {
    id: ID!
    recipient: String!
    amount: Float!
  }

  type Query {
    hello: String
  }

  type Mutation {
    createTip(recipient: String!, amount: Float!): Tip
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
  Mutation: {
    createTip: async (_, { recipient, amount }) => {
      const newTip = new Tip({ recipient, amount });
      await newTip.save();
      return newTip;
    },
  },
};

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Middleware
app.use(express.json());
//app.use(authenticationMiddleware); // Protects all subsequent routes

// Start the Apollo Server and apply middleware to Express app
server.start().then(() => {
 // server.applyMiddleware({ app });
});

// Routes
app.use('/api/tips', tipRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
