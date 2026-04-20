const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  roomNo:             { type: String, required: true, unique: true },
  capacity:           { type: Number, required: true },
  occupants:          { type: Number, default: 0 },
  availabilityStatus: { type: String, enum: ['Available', 'Full', 'Maintenance'], default: 'Available' },
  studentIds:         { type: [String], default: [] },
  block:              { type: String, default: '' },
  type:               { type: String, default: 'Double' },
}, { timestamps: true });

module.exports = mongoose.model('Room', RoomSchema);
