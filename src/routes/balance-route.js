const express = require('express');
const balanceService = require('../services/balance-service');

const router = express.Router();

router.get('/balance', async (req, res, next) => {
    const accountID = req.query.account_id;

    try {
        const balance = await balanceService.getBalance(accountID);
        return res.status(200).send(balance.toString());
    } catch(err) {
        next(err);
    }
})

module.exports = router;