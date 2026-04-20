const express = require('express');
const router = express.Router();
const GymSubscription = require('../models/GymSubscription');

// --- Gym Subscriptions ---

// GET /api/gym/subscriptions
router.get('/subscriptions', async (req, res) => {
  try {
    const subs = await GymSubscription.find().sort({ enrolledAt: -1 });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST /api/gym/subscriptions
router.post('/subscriptions', async (req, res) => {
  try {
    // Check both name and room to uniquely identify the student's subscription instead of just name
    await GymSubscription.deleteMany({ name: req.body.name, room: req.body.room });
    
    const newSub = new GymSubscription({ ...req.body, id: Date.now().toString() });
    const saved = await newSub.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// PUT /api/gym/subscriptions/:id/pay
router.put('/subscriptions/:id/pay', async (req, res) => {
  try {
    const updated = await GymSubscription.findOneAndUpdate(
      { id: req.params.id },
      { paymentStatus: 'Paid' },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
