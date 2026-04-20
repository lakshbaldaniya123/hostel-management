const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting');

// GET /api/meetings - Handle fetching all meetings
router.get('/', async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ createdAt: -1 });
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST /api/meetings - Handle creating a new meeting
router.post('/', async (req, res) => {
  try {
    const newMeeting = new Meeting(req.body);
    const savedMeeting = await newMeeting.save();
    res.status(201).json(savedMeeting);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// DELETE /api/meetings/:id - Optional: Handle deleting a meeting
router.delete('/:id', async (req, res) => {
  try {
    await Meeting.findOneAndDelete({ id: req.params.id });
    res.json({ message: 'Meeting deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
