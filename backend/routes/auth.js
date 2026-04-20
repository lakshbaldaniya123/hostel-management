const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { hostelId, password, role, staffRole } = req.body;

  // ── 1. Require both fields ──────────────────────────────────────────────
  if (!hostelId || !password) {
    return res.status(400).json({ message: 'Hostel ID and password are required.' });
  }

  try {
    // ── 2. Find the user by hostelId ────────────────────────────────────────
    const user = await User.findOne({ hostelId });

    if (!user) {
      return res.status(401).json({ message: 'Invalid ID. No account found with this Hostel ID.' });
    }

    // ── 3. Validate password ────────────────────────────────────────────────
    // Plain-text comparison for now (Phase 1). Replace with bcrypt in production.
    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password. Please try again.' });
    }

    // ── 4. Validate role matches ─────────────────────────────────────────────
    const requestedRole = role === 'Staff' ? 'Staff' : role;
    if (user.role !== requestedRole) {
      return res.status(403).json({
        message: `This account is registered as "${user.role}", not "${requestedRole}".`
      });
    }

    // ── 5. For Staff, also validate department (Housekeeper vs Security) ────
    if (role === 'Staff' && staffRole && user.department !== staffRole) {
      return res.status(403).json({
        message: `This staff account belongs to "${user.department}", not "${staffRole}".`
      });
    }

    // ── 6. Success ───────────────────────────────────────────────────────────
    res.json({
      token: `mock-jwt-${user.hostelId}-${Date.now()}`,
      user: {
        hostelId:   user.hostelId,
        name:       user.name,
        role:       user.role,
        department: user.department,
        block:      user.block,   // Warden's assigned block (e.g. 'A', 'B', 'C')
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});
// POST /api/auth/staff (Getting staff)
router.get('/staff', async (req, res) => {
  try {
    const staffMembers = await User.find(
      { role: { $in: ['Warden', 'Staff'] } },
      '-password' // Exclude passwords for safety
    );
    res.json(staffMembers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching staff members' });
  }
});

module.exports = router;
