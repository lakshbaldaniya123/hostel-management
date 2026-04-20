const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  targetRole: { type: String, required: true }, // 'Student', 'Housekeeper', 'Security', 'All'
  description: { type: String },
  date: { type: String, required: true },
  time: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Meeting', MeetingSchema);
