const express = require('express');
const cors = require('cors');
const webhookRoutes = require('./routes/webhookRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Main webhook route
app.use('/webhook', webhookRoutes);

// Simple health check endpoint
app.get('/', (req, res) => {
  res.send('GitGuard AI Backend is up and running!');
});

module.exports = app;
