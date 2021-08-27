const accountData = require('../data/account-data');
const { NonExistentAccountError } = require('../errors/errors');

const supportedEvents = {
    DEPOSIT: 'deposit',
    WITHDRAW: 'withdraw',
    TRANSFER: 'transfer',
};

function handleEvent(eventType, transactionData) {
    return {
        [supportedEvents.DEPOSIT]: handleDeposit,
        [supportedEvents.WITHDRAW]: handleWithDraw,
        [supportedEvents.TRANSFER]: handleTransfer,
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

    const newBalance = currentBalance - amount;

    const account = await accountData.setBalance(origin, newBalance);

    return {
        origin: {
            id: account.id,
            balance: account.balance,
        },
    };
}

async function handleTransfer(transactionData) {
    const { origin, amount, destination } = transactionData;

    const originAccountCurrentBalance = await accountData.getBalance(origin);

    if (!originAccountCurrentBalance) {
        throw new NonExistentAccountError();
    }

    const originAccountNewBalance = originAccountCurrentBalance - amount;

    const originAccount = await accountData.setBalance(
        origin,
        originAccountNewBalance
    );

    const destinationAccountCurrentBalance = await accountData.getBalance(destination);

    if (!destinationAccountCurrentBalance) {
        const destinationAccount = await accountData.createAccount(
            destination,
            amount
        );

        return assembleTransferOperationResult(originAccount, destinationAccount);
    }

    const destinationAccountNewBalance = destinationAccountCurrentBalance + amount;

    const destinationAccount = await accountData.setBalance(
        destination,
        destinationAccountNewBalance
    );

    return assembleTransferOperationResult(originAccount, destinationAccount);
}

function assembleTransferOperationResult(originAccount, destinationAccount) {
    return {
        origin: {
            id: originAccount.id,
            balance: originAccount.balance,
        },
        destination: {
            id: destinationAccount.id,
            balance: destinationAccount.balance,
        },
    };
}

module.exports = {
    supportedEvents,
    handleEvent,
};