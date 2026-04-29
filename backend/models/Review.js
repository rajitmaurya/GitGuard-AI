const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  repo: {
    type: String,
    required: true
  },
  prNumber: {
    type: Number,
    required: true
  },
  issues: [
    {
      type: { type: String }, // e.g., 'Bug', 'Security', 'Performance'
      severity: String, // e.g., 'High', 'Medium', 'Low'
      description: String,
      fix: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Review', reviewSchema);
