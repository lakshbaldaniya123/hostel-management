const mongoose = require('mongoose');

const MessMenuSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  menu: { type: mongoose.Schema.Types.Mixed, required: true }
});

module.exports = mongoose.model('MessMenu', MessMenuSchema);
