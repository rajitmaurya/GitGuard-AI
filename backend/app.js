const express = require('express');
const webhookRoutes = require('./routes/webhookRoutes');

const app = express();

// Middleware to parse JSON payloads from GitHub webhooks
app.use(express.json());

// Main webhook route
app.use('/webhook', webhookRoutes);

// Simple health check endpoint
app.get('/', (req, res) => {
  res.send('GitGuard AI Backend is up and running!');
});

module.exports = app;
