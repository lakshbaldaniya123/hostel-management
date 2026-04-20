const express = require('express');
const router = express.Router();
const VendingItem = require('../models/VendingItem');

const initialCategories = [
  // Block A Lobby
  { location: 'Block A Lobby', name: 'Lays Classic', price: '₹20', stock: 0, status: 'Empty', img: '🥔' },
  { location: 'Block A Lobby', name: 'Red Bull', price: '₹120', stock: 0, status: 'Empty', img: '🥤' },
  { location: 'Block A Lobby', name: 'Dairy Milk', price: '₹40', stock: 0, status: 'Empty', img: '🍫' },
  { location: 'Block A Lobby', name: 'Diet Coke', price: '₹40', stock: 0, status: 'Empty', img: '🥫' },
  { location: 'Block A Lobby', name: 'Kurkure', price: '₹20', stock: 0, status: 'Empty', img: '🌶️' },
  { location: 'Block A Lobby', name: 'Water Bottle', price: '₹20', stock: 0, status: 'Empty', img: '💧' },
  // Block B Ground
  { location: 'Block B Ground', name: 'Oreo', price: '₹30', stock: 0, status: 'Empty', img: '🍪' },
  { location: 'Block B Ground', name: 'Mountain Dew', price: '₹40', stock: 0, status: 'Empty', img: '🥤' },
  { location: 'Block B Ground', name: 'Snickers', price: '₹50', stock: 0, status: 'Empty', img: '🍫' },
  { location: 'Block B Ground', name: 'Nachos', price: '₹60', stock: 0, status: 'Empty', img: '🧀' },
  { location: 'Block B Ground', name: 'Water Bottle', price: '₹20', stock: 0, status: 'Empty', img: '💧' },
  { location: 'Block B Ground', name: 'Cold Coffee', price: '₹80', stock: 0, status: 'Empty', img: '☕' },
  // Central Library
  { location: 'Central Library', name: 'Protein Bar', price: '₹100', stock: 0, status: 'Empty', img: '💪' },
  { location: 'Central Library', name: 'Black Coffee', price: '₹50', stock: 0, status: 'Empty', img: '☕' },
  { location: 'Central Library', name: 'Mixed Nuts', price: '₹80', stock: 0, status: 'Empty', img: '🥜' },
  { location: 'Central Library', name: 'Water Bottle', price: '₹20', stock: 0, status: 'Empty', img: '💧' },
  { location: 'Central Library', name: 'Energy Drink', price: '₹110', stock: 0, status: 'Empty', img: '⚡' },
  { location: 'Central Library', name: 'Dark Choco', price: '₹90', stock: 0, status: 'Empty', img: '🍫' },
];

// GET /api/vending
router.get('/', async (req, res) => {
  try {
    let items = await VendingItem.find();
    if (items.length === 0) {
      // Auto seed if empty
      await VendingItem.insertMany(initialCategories);
      items = await VendingItem.find();
    }
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT /api/vending/:id - Restock functionality
router.put('/:id', async (req, res) => {
  try {
    const { stock, status } = req.body;
    const updated = await VendingItem.findByIdAndUpdate(
      req.params.id, 
      { stock, status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
