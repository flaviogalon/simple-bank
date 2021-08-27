const express = require('express');
const eventService = require('../services/event-service');

const router = express.Router();

router.post('/event', async (req, res, next) => {
    const { type, ...transactionData } = req.body;

    try {
        const result = await eventService.handleEvent(type, transactionData);
        return res.status(200).json(result);
    } catch(err) {
        next(err);
    }
})

module.exports = router;