const mongoose = require('mongoose');

const LostFoundItemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  itemName: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  contactName: { type: String },
  contactNumber: { type: String },
  posterName: { type: String },
  room: { type: String },
  date: { type: String, default: () => new Date().toLocaleDateString('en-GB') },
  status: { type: String, default: 'Open' }
}, { timestamps: true });

module.exports = mongoose.model('LostFoundItem', LostFoundItemSchema);
