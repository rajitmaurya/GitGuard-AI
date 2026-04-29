const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

// POST /webhook
// GitHub will send POST requests to this endpoint when PR events happen
router.post('/', webhookController.handleWebhook);

module.exports = router;
