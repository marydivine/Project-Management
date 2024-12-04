// routes/feedback.js
const express = require('express');
const Feedback = require('../models/Feedback'); // Assuming a Mongoose model called Feedback
const router = express.Router();

// Post feedback
router.post('/submit', async (req, res) => {
  try {
    const { name, unit, feedback } = req.body;

    const newFeedback = new Feedback({ name, unit, feedback });
    await newFeedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (err) {
    console.error('Error submitting feedback:', err);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

module.exports = router;
