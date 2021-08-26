const accountData = require('../data/account-data');
const { NonExistentAccountError } = require('../errors/errors');

const supportedEvents = {
    DEPOSIT: 'deposit',
    WITHDRAW: 'withdraw',
};

function handleEvent(eventType, transactionData) {
    return {
        [supportedEvents.DEPOSIT]: handleDeposit,
        [supportedEvents.WITHDRAW]: handleWithDraw,
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
        destination: {
            id: account.id,
            balance: account.balance,
        },
    };
}

async function handleWithDraw(transactionData) {
    const { origin, amount } = transactionData;

    const currentBalance = await accountData.getBalance(origin);

    if (!currentBalance) {
        throw new NonExistentAccountError();
    }
}

module.exports = {
    supportedEvents,
    handleEvent,
    handleWithDraw,
};