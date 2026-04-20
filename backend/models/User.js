const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  hostelId:   { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  role:       { type: String, enum: ['Student', 'Warden', 'Admin', 'Staff'], required: true },
  department: { type: String, enum: ['Housekeeper', 'Security', null], default: null },
  name:       { type: String, required: true },
  block:      { type: String, default: null },  // Assigned block for Wardens (e.g. 'A', 'B', 'C')
});

module.exports = mongoose.model('User', UserSchema);
