const mongoose = require('mongoose');

const LostFoundLogSchema = new mongoose.Schema({
  item: { type: String, required: true },
  finder: { type: String },
  claimer: { type: String },
  foundTime: { type: String },
  claimedTime: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('LostFoundLog', LostFoundLogSchema);
