const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ studentId: 1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single student
router.get('/:studentId', async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.studentId });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add a student
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    const saved = await student.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a student (details or room allocation)
router.put('/:studentId', async (req, res) => {
  try {
    const updated = await Student.findOneAndUpdate(
      { studentId: req.params.studentId },
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Student not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST /api/students/enroll  ── Admin: add new student atomically
router.post('/enroll', async (req, res) => {
  const mongoose = require('mongoose');
  const User  = require('../models/User');
  const Room  = require('../models/Room');
  const Fees  = require('../models/Fees');

  const { studentId, name, email, phone, course, parentName, parentPhone, password = 'student@123' } = req.body;

  // ── Validate required fields ─────────────────────────────────────────────
  if (!studentId || !name || !phone || !course) {
    return res.status(400).json({ message: 'studentId, name, phone, and course are required.' });
  }

  // ── Check duplicate studentId ────────────────────────────────────────────
  const existing = await Student.findOne({ studentId });
  if (existing) return res.status(409).json({ message: `Student ID "${studentId}" already exists.` });

  const existingUser = await User.findOne({ hostelId: studentId });
  if (existingUser) return res.status(409).json({ message: `Login ID "${studentId}" already in use.` });

  // ── Find first available room ─────────────────────────────────────────────
  const room = await Room.findOne({ availabilityStatus: 'Available' }).sort({ roomNo: 1 });
  if (!room) return res.status(404).json({ message: 'No available rooms. Please add rooms first.' });

  try {
    // 1. Create Student
    const student = await Student.create({
      studentId, name, email, phone, course,
      roomNo: room.roomNo,
      status: 'In Hostel',
      parentName:  parentName  || '',
      parentPhone: parentPhone || '',
      feesStatus:  'Pending',
    });

    // 2. Create User login
    await User.create({ hostelId: studentId, password, role: 'Student', department: null, name });

    // 3. Update Room
    const newOccupants  = room.occupants + 1;
    const newStudentIds = [...room.studentIds, studentId];
    const newStatus     = newOccupants >= room.capacity ? 'Full' : 'Available';
    await Room.findByIdAndUpdate(room._id, {
      occupants: newOccupants,
      studentIds: newStudentIds,
      availabilityStatus: newStatus,
    });

    // 4. Create Fee record
    const feeCount = await Fees.countDocuments();
    await Fees.create({
      id:          `FEE-${String(feeCount + 1).padStart(3, '0')}`,
      studentId,
      studentName: name,
      roomNo:      room.roomNo,
      amount:      25000,
      dueDate:     new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      paidDate:    null,
      status:      'Pending',
      semester:    'Semester 2 2026',
      description: 'Hostel Fee + Mess Charges',
    });

    res.status(201).json({
      student,
      assignedRoom: room.roomNo,
      loginId:      studentId,
      password,
      message:      `Student enrolled successfully in room ${room.roomNo}.`,
    });

  } catch (err) {
    res.status(500).json({ message: 'Enrollment failed: ' + err.message });
  }
});

// DELETE a student

router.delete('/:studentId', async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const User = require('../models/User');
    const Room = require('../models/Room');
    const Fees = require('../models/Fees');
    const GymSubscription = require('../models/GymSubscription');

    // 1. Delete the Student profile
    await Student.findOneAndDelete({ studentId });

    // 2. Delete the User login credentials
    await User.findOneAndDelete({ hostelId: studentId });

    // 3. Free up their Room bed properly
    if (student.roomNo) {
      const room = await Room.findOne({ roomNo: student.roomNo });
      if (room) {
        const updatedStudentIds = room.studentIds.filter(id => id !== studentId);
        const updatedOccupants = Math.max(0, room.occupants - 1);
        const updatedStatus = updatedOccupants >= room.capacity ? 'Full' : 'Available';
        
        await Room.findOneAndUpdate(
          { roomNo: student.roomNo },
          { 
            $set: { 
              studentIds: updatedStudentIds, 
              occupants: updatedOccupants,
              availabilityStatus: updatedStatus 
            } 
          }
        );
      }
    }

    // 4. Clean up related monetary bindings
    await Fees.deleteMany({ studentId });
    await GymSubscription.deleteMany({ name: student.name, room: student.roomNo });

    // Note: GatePass, Leave, and Complaint records are kept to preserve historical audit logs.

    res.json({ message: 'Student and related records successfully removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
