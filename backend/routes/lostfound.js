const express = require('express');
const router = express.Router();
const LostFoundItem = require('../models/LostFoundItem');
const LostFoundLog = require('../models/LostFoundLog');

// GET /api/lostfound/items
router.get('/items', async (req, res) => {
  try {
    const items = await LostFoundItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET /api/lostfound/logs
router.get('/logs', async (req, res) => {
  try {
    const logs = await LostFoundLog.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST /api/lostfound/items
router.post('/items', async (req, res) => {
  try {
    const newItem = new LostFoundItem(req.body);
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT /api/lostfound/items/:id/resolve
router.put('/items/:id/resolve', async (req, res) => {
  try {
    const { claimerName, logData } = req.body;
    
    // Update the item
    const item = await LostFoundItem.findOneAndUpdate(
      { id: req.params.id },
      { status: 'Resolved' },
      { new: true }
    );

    // Save the log
    if (logData) {
      const newLog = new LostFoundLog(logData);
      await newLog.save();
    }

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE /api/lostfound/items/:id
router.delete('/items/:id', async (req, res) => {
  try {
    await LostFoundItem.findOneAndDelete({ id: req.params.id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
