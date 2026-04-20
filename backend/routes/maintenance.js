const express = require('express');
const router = express.Router();
const Maintenance = require('../models/Maintenance');

// Get all requests
router.get('/', async (req, res) => {
  try {
    const requests = await Maintenance.find().sort({ registeredAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new maintenance request
router.post('/', async (req, res) => {
  try {
    // Generate a secure unique ID
    const id = req.body.id || `M-${require('crypto').randomBytes(4).toString('hex').toUpperCase()}`;
    
    const newRequest = new Maintenance({
      ...req.body,
      id
    });
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update particular fields (like scheduling, completion)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Maintenance.findOneAndUpdate(
      { id: req.params.id }, 
      { $set: { status: req.body.status, scheduledDate: req.body.scheduledDate, completedDate: req.body.completedDate, remarks: req.body.remarks, assignedTo: req.body.assignedTo } }, 
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Request not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
