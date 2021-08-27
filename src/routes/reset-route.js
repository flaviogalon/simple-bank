const express = require('express');
const resetService = require('../services/reset-service');

const router = express.Router();

router.post('/reset', async (req, res, next) => {
    try {
        await resetService.resetData();
        return res.status(200).send('OK');
    } catch(err) {
        next(err);
    }
})

module.exports = router;