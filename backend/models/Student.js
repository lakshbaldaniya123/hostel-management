const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  studentId:   { type: String, required: true, unique: true },
  name:        { type: String, required: true },
  email:       { type: String, default: '' },
  phone:       { type: String, default: '' },
  course:      { type: String, default: '' },
  roomNo:      { type: String, default: 'Unassigned' },
  status:      { type: String, default: 'In Hostel' },
  parentName:  { type: String, default: '' },
  parentPhone: { type: String, default: '' },
  feesStatus:  { type: String, enum: ['Paid', 'Pending', 'Overdue'], default: 'Pending' },
  entryExitLogs: { type: Array, default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
