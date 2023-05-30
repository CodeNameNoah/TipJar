const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
  recipient: String,
  amount: Number,
});

const Tip = mongoose.model('Tip', tipSchema);

module.exports = Tip;
