const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');

// GET all leave requests
router.get('/', async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ createdAt: -1 });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST submit a new leave request
router.post('/', async (req, res) => {
  try {
    const id = req.body.id || `LV-${require('crypto').randomBytes(4).toString('hex').toUpperCase()}`;
    const leave = new Leave({ ...req.body, id });
    const saved = await leave.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update leave status (Approved / Rejected)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Leave.findOneAndUpdate(
      { id: req.params.id },
      { $set: { status: req.body.status, adminRemarks: req.body.adminRemarks } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Leave request not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
