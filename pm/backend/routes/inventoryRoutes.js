// backend/routes/inventory.js
const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

// GET all inventory items
router.get('/', async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// POST reorder inventory item
router.post('/inventory', async (req, res) => {
  try {
    const { unit, item, stock, reorderLevel } = req.body;

    // Validation
    if (!unit || !item || stock == null || reorderLevel == null) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Save to database (adjust according to your database structure)
    const newItem = await Inventory.create({ unit, item, stock, reorderLevel });
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating inventory item:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;

