const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// GET all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ submittedAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST submit a complaint
router.post('/', async (req, res) => {
  try {
    const id = req.body.id || `CMP-${require('crypto').randomBytes(4).toString('hex').toUpperCase()}`;
    const complaint = new Complaint({ ...req.body, id });
    const saved = await complaint.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update complaint status or add response
router.put('/:id', async (req, res) => {
  try {
    const updated = await Complaint.findOneAndUpdate(
      { id: req.params.id },
      { $set: { status: req.body.status, adminResponse: req.body.adminResponse } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Complaint not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
