const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  unit: { type: String, required: true },
  name: { type: String, required: true },
  feedback: { type: String, required: true }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
