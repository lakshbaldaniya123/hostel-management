const mongoose = require('mongoose');

const FeesSchema = new mongoose.Schema({
  id:          { type: String, required: true, unique: true },
  studentId:   { type: String, required: true },
  studentName: { type: String, required: true },
  roomNo:      { type: String, default: '' },
  amount:      { type: Number, required: true },
  dueDate:     { type: String, default: '' },
  paidDate:    { type: String, default: null },
  status:      { type: String, enum: ['Paid', 'Pending', 'Overdue'], default: 'Pending' },
  semester:    { type: String, default: '' },
  description: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Fees', FeesSchema);
