const eventService = require('./event-service');
const accountData = require('../data/account-data');
const { NonExistentAccountError } = require('../errors/errors');

it('should create a new account with initial balance', async () => {
    const eventType = eventService.supportedEvents.DEPOSIT;
    const transactionData = { "destination":"100", "amount":10 };

    jest.spyOn(accountData, 'getBalance').mockImplementationOnce((accountID) => {
        return Promise.resolve(undefined);
    });

    jest.spyOn(accountData, "createAccount").mockImplementationOnce(
        (accountID, initialBalance) => {
            return Promise.resolve({
                id: accountID,
                balance: initialBalance,
            });
        }
    );

    const transactionResult = await eventService.handleEvent(
        eventType,
        transactionData
    );

    expect(transactionResult.destination.id).toEqual(transactionData.destination);
    expect(transactionResult.destination.balance).toEqual(transactionData.amount);
});

it('should increment an account balance', async () => {
    const eventType = eventService.supportedEvents.DEPOSIT;
    const transactionData = { "destination":"100", "amount":10 };
    const initialBalance = 10;
    const finalBalance = initialBalance + transactionData.amount;

    jest.spyOn(accountData, 'getBalance').mockImplementationOnce((accountID) => {
        return Promise.resolve(initialBalance);
    });

    jest.spyOn(accountData, "setBalance").mockImplementationOnce(
        (accountID, newBalance) => {
            return Promise.resolve({
                id: accountID,
                balance: finalBalance,
            });
        }
    );

    const transactionResult = await eventService.handleEvent(
        eventType,
        transactionData
    );

    expect(transactionResult.destination.balance).toEqual(20);
});

it('should throw NonExistentAccountError if trying to withdraw from non existing account', async () => {
    const eventType = eventService.supportedEvents.WITHDRAW;
    const transactionData = { "destination":"200", "amount":10 };

    jest.spyOn(accountData, 'getBalance').mockImplementationOnce((accountID) => {
        return Promise.resolve(undefined);
    });

    await expect(eventService.handleEvent(eventType, transactionData))
    .rejects
    .toThrowError(NonExistentAccountError);
});