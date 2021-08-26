const accountData = require('../data/account-data');

async function getBalance(accountID) {
    const balance = await accountData.getBalance(accountID);

    return balance;
}

module.exports = {
    getBalance,
}