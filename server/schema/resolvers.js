const Tip = require("../models/Tip")


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

  module.exports = resolvers;