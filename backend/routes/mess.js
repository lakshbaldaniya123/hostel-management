const express = require('express');
const router = express.Router();
const MessMenu = require('../models/MessMenu');
const MessFeedback = require('../models/MessFeedback');

const DEFAULT_MENU = {
  Monday: { breakfast: 'Poha + Jalebi', lunch: 'Dal + Rice + Aloo Sabzi', snacks: 'Samosa', dinner: 'Roti + Paneer Butter Masala' },
  Tuesday: { breakfast: 'Idli + Sambar', lunch: 'Rajma + Chawal', snacks: 'Bread Pakora', dinner: 'Roti + Mix Veg' },
  Wednesday: { breakfast: 'Aloo Paratha', lunch: 'Kadi + Pakora', snacks: 'Noodles', dinner: 'Roti + Egg Curry / Dal Tadka' },
  Thursday: { breakfast: 'Upma', lunch: 'Chole + Bhature', snacks: 'Patties', dinner: 'Roti + Bhindi' },
  Friday: { breakfast: 'Sandwich', lunch: 'Dal Makhani + Rice', snacks: 'Bhel Puri', dinner: 'Roti + Malai Kofta' },
  Saturday: { breakfast: 'Puri Sabzi', lunch: 'Pulao + Raita', snacks: 'Pav Bhaji', dinner: 'Roti + Chicken / Soya Chaap' },
  Sunday: { breakfast: 'Masala Dosa', lunch: 'Special Thali', snacks: 'Pastries', dinner: 'Roti + Dal Fry' },
};

// --- MENU ROUTES ---

// GET /api/mess/menu
router.get('/menu', async (req, res) => {
  try {
    let menuDoc = await MessMenu.findOne({ id: 'weekly_menu' });
    if (!menuDoc) {
      menuDoc = new MessMenu({ id: 'weekly_menu', menu: DEFAULT_MENU });
      await menuDoc.save();
    }
    res.json(menuDoc.menu);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT /api/mess/menu
router.put('/menu', async (req, res) => {
  try {
    const updated = await MessMenu.findOneAndUpdate(
      { id: 'weekly_menu' },
      { menu: req.body },
      { new: true, upsert: true }
    );
    res.json(updated.menu);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// --- FEEDBACK ROUTES ---

// GET /api/mess/feedback
router.get('/feedback', async (req, res) => {
  try {
    const feedback = await MessFeedback.find().sort({ _id: -1 });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST /api/mess/feedback
router.post('/feedback', async (req, res) => {
  try {
    const newFeedback = new MessFeedback({ ...req.body, id: Date.now().toString() });
    const saved = await newFeedback.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT /api/mess/feedback/:id/read
router.put('/feedback/:id/read', async (req, res) => {
  try {
    const updated = await MessFeedback.findOneAndUpdate(
      { id: req.params.id },
      { status: 'Read' },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
