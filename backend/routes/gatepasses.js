const express = require('express');
const router = express.Router();
const GatePass = require('../models/GatePass');

// GET all gate passes
router.get('/', async (req, res) => {
  try {
    const passes = await GatePass.find().sort({ requestedAt: -1 });
    res.json(passes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST request a gate pass
router.post('/', async (req, res) => {
  try {
    const id = req.body.id || `GP-${require('crypto').randomBytes(4).toString('hex').toUpperCase()}`;
    const pass = new GatePass({ ...req.body, id });
    const saved = await pass.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT approve / reject / checkout / return
router.put('/:id', async (req, res) => {
  try {
    const updated = await GatePass.findOneAndUpdate(
      { id: req.params.id },
      { $set: { status: req.body.status, checkOutTime: req.body.checkOutTime, returnTime: req.body.returnTime, adminRemarks: req.body.adminRemarks } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Gate pass not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
