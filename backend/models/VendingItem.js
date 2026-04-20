const mongoose = require('mongoose');

const VendingItemSchema = new mongoose.Schema({
  location: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  stock: { type: Number, default: 0 },
  status: { type: String, default: 'Empty' },
  img: { type: String, default: '🥤' }
});

module.exports = mongoose.model('VendingItem', VendingItemSchema);
