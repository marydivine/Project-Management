const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  unit: { type: Number, required: true }
});

module.exports = mongoose.model('Inventory', InventorySchema);
