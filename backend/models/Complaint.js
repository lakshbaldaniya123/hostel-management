const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  id:          { type: String, required: true, unique: true },
  studentId:   { type: String, default: '' },
  studentName: { type: String, required: true },
  roomNo:      { type: String, default: '' },
  category:    { type: String, default: 'General' },
  description: { type: String, required: true },
  status:      { type: String, enum: ['Pending', 'In Progress', 'Resolved', 'Closed'], default: 'Pending' },
  response:    { type: String, default: '' },
  submittedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', ComplaintSchema);
