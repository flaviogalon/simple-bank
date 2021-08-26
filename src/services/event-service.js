const accountData = require('../data/account-data');

const supportedEvents = {
    DEPOSIT: 'deposit',
};

function handleEvent(eventType, transactionData) {
    return {
        [supportedEvents.DEPOSIT]: handleDeposit,
    } [eventType](transactionData);
}

async function handleDeposit(transactionData) {
    const { destination, amount } = transactionData;

    const currentBalance = await accountData.getBalance(destination);

    if (!currentBalance) {
        const account = await accountData.createAccount(destination, amount);
        return {
            destination: account,
        }
    }

    const newBalance = currentBalance + amount;

    const account = await accountData.setBalance(destination, newBalance);

    return {
        destination: account,
    }
}

module.exports = {
    handleEvent,
};