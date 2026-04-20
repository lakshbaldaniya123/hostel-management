const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// GET all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find().sort({ roomNo: 1 });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add a room
router.post('/', async (req, res) => {
  try {
    const room = new Room(req.body);
    const saved = await room.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a room (occupants, status, studentIds)
router.put('/:roomNo', async (req, res) => {
  try {
    const updated = await Room.findOneAndUpdate(
      { roomNo: req.params.roomNo },
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Room not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a room
router.delete('/:roomNo', async (req, res) => {
  try {
    const roomNo = req.params.roomNo;
    await Room.findOneAndDelete({ roomNo });
    
    // Reverse cascade: Unassign students from this deleted room
    const Student = require('../models/Student');
    await Student.updateMany(
      { roomNo },
      { $set: { roomNo: null } }
    );
    
    res.json({ message: 'Room removed and students unassigned' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
