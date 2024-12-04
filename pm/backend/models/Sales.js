const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
  unit: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sales', SalesSchema);
