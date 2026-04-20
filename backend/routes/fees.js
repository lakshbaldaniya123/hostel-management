const express = require('express');
const router = express.Router();
const Fees = require('../models/Fees');

// GET all fees records
router.get('/', async (req, res) => {
  try {
    const fees = await Fees.find().sort({ dueDate: 1 });
    res.json(fees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add a fee record
router.post('/', async (req, res) => {
  try {
    const id = req.body.id || `FEE-${Date.now().toString().slice(-6)}`;
    const fee = new Fees({ ...req.body, id });
    const saved = await fee.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const Student = require('../models/Student');

// PUT mark as paid or update
router.put('/:id', async (req, res) => {
  try {
    const updated = await Fees.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Fee record not found' });

    // Ensure system integrity: If the fee is paid, also sync the Student's global feesStatus
    if (req.body.status === 'Paid' && updated.studentId) {
      await Student.findOneAndUpdate(
        { studentId: updated.studentId },
        { $set: { feesStatus: 'Paid' } }
      );
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a fee record
router.delete('/:id', async (req, res) => {
  try {
    await Fees.findOneAndDelete({ id: req.params.id });
    res.json({ message: 'Fee record removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
