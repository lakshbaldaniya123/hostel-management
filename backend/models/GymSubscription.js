const mongoose = require('mongoose');

const GymSubscriptionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  room: { type: String, required: true },
  plan: { type: String, required: true },
  fee: { type: Number, required: true },
  paymentStatus: { type: String, default: 'Pending' },
  enrolledAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GymSubscription', GymSubscriptionSchema);
