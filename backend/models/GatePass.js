const mongoose = require('mongoose');

const GatePassSchema = new mongoose.Schema({
  id:          { type: String, required: true, unique: true },
  studentId:   { type: String, default: '' },
  studentName: { type: String, required: true },
  roomNo:      { type: String, default: '' },
  destination: { type: String, default: '' },
  purpose:     { type: String, default: '' },
  exitTime:    { type: String, default: '' },
  returnTime:  { type: String, default: '' },
  dates:       { type: String, default: '' },
  reason:      { type: String, default: '' },
  name:        { type: String, default: '' },
  room:        { type: String, default: '' },
  status:      { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Checked Out', 'Returned'], default: 'Pending' },
  approvedBy:  { type: String, default: '' },
  requestedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('GatePass', GatePassSchema);
