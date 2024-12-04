// salesroute.js
const express = require('express');
const Sales = require('../models/Sales');
const router = express.Router();

// Record sale
router.post('/add', async (req, res) => {
  const { unit, amount } = req.body;
  
  const newSale = new Sales({ unit, amount });
  await newSale.save();
  
  res.status(201).json({ message: 'Sale recorded successfully' });
});

// Get sales overview
// salesroute.js
router.get('/', async (req, res) => {
    try {
      const sales = await Sales.aggregate([
        { $group: { _id: "$unit", totalSales: { $sum: "$amount" } } },
        { $sort: { totalSales: -1 } }
      ]);
      
      console.log('Sales Data:', sales);  // Log the data to verify the structure
      res.json(sales);  // Send the sales data to the frontend
    } catch (err) {
      console.error('Error fetching sales:', err);
      res.status(500).json({ error: 'Failed to fetch sales data' });
    }
  });
  

module.exports = router;
