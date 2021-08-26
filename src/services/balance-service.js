const accountData = require('../data/account-data');
const { NonExistentAccountError } = require('../errors/errors');

async function getBalance(accountID) {
    const balance = await accountData.getBalance(accountID);

    if (!balance) {
        throw new NonExistentAccountError();
    }

    return balance;
}

module.exports = {
    getBalance,
}