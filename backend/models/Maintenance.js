const mongoose = require('mongoose');

const MaintenanceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  roomNo: { type: String, required: true },
  issueType: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  status: { type: String, default: 'Pending' },
  scheduledDate: { type: String, default: null },
  scheduledTime: { type: String, default: null },
  registeredAt: { type: Date, default: Date.now },
  rejectionReason: { type: String, default: null }
});

module.exports = mongoose.model('Maintenance', MaintenanceSchema);
