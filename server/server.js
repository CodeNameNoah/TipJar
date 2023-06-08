const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const tipRoutes = require('./routes/tipRoutes');
//const authenticationMiddleware = require('./middleware/authentication');
const { ApolloServer, gql } = require('apollo-server-express');
const Tip = require('./models/Tip'); // import your Mongoose Tip model
const router = express.Router();
const authenticationMiddleware = require('./middleware/authentication');
const authRoutes = require('./routes/authRoutes');

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tip-creator')
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
    getTip(id: ID!): Tip
  }

  type Mutation {
    createTip(recipient: String!, amount: Float!): Tip
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    getTip: async (_, { id }) => {
      const tip = await Tip.findById(id);
      return tip;
    },
  },
  Mutation: {
    createTip: async (_, { recipient, amount }) => {
      const newTip = await Tip.create({recipient, amount})
      /*const newTip = new Tip({ recipient, amount });
      await newTip.save();*/
      return newTip;
    },
  },
};


// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Middleware
app.use(express.json());


// Start the Apollo Server and apply middleware to Express app
server.start().then(() => {
 server.applyMiddleware({ app });
});

// Routes
app.use('/api/tips', tipRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
