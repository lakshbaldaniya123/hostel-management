const mongoose = require('mongoose');

const MessFeedbackSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  room: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, default: 'Unread' },
  meal: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true }
});

module.exports = mongoose.model('MessFeedback', MessFeedbackSchema);
