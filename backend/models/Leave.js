const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
  id:          { type: String, required: true, unique: true },
  studentId:   { type: String, default: '' },
  studentName: { type: String, required: true },
  roomNo:      { type: String, default: '' },
  parentPhone: { type: String, default: '' },
  fromDate:    { type: String, required: true },
  fromTime:    { type: String, default: '' },
  toDate:      { type: String, required: true },
  toTime:      { type: String, default: '' },
  reason:      { type: String, default: '' },
  status:      { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Leave', LeaveSchema);
