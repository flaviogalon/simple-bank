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
                balance: newBalance,
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
    const transactionData = { "origin":"200", "amount":10 };

    jest.spyOn(accountData, 'getBalance').mockImplementationOnce((accountID) => {
        return Promise.resolve(undefined);
    });

    await expect(eventService.handleEvent(eventType, transactionData))
    .rejects
    .toThrowError(NonExistentAccountError);
});

it('should decrement an account balance', async () => {
    const eventType = eventService.supportedEvents.WITHDRAW;
    const transactionData = { "origin":"200", "amount":20 };
    const currentBalance = 10;
    const expectedBalance = currentBalance - transactionData.amount;

    jest.spyOn(accountData, 'getBalance').mockImplementationOnce((accountID) => {
        return Promise.resolve(currentBalance);
    });

    jest.spyOn(accountData, 'setBalance').mockImplementationOnce((accountID, amount) => {
        return Promise.resolve({
            id: accountID,
            balance: amount,
        });
    });

    const transactionResult = await eventService.handleEvent(
        eventType,
        transactionData
    );

    expect(transactionResult.origin.balance).toEqual(expectedBalance);
});

it('should throw NonExistentAccountError if trying to transfer from non existing account', async () => {
    const eventType = eventService.supportedEvents.TRANSFER;
    const transactionData = {
        type: "transfer",
        origin: "200",
        amount: 15,
        destination: "300",
    };

    jest.spyOn(accountData, 'getBalance').mockImplementationOnce((accountID) => {
        return Promise.resolve(undefined);
    });

    await expect(eventService.handleEvent(eventType, transactionData))
    .rejects
    .toThrowError(NonExistentAccountError);
});

it('should transfer money between accounts - destination account non existent scenario', async () => {
    const eventType = eventService.supportedEvents.TRANSFER;
    const transactionData = { "origin":"100", "amount":15, "destination":"300" };
    const originAccountCurrentBalance = 15;
    const originAccountNewBalance = originAccountCurrentBalance - transactionData.amount;
    const destinationAccountNewBalance = 0 + transactionData.amount;

    // Querying origin account balance
    jest.spyOn(accountData, 'getBalance').mockImplementationOnce((accountID) => {
        return Promise.resolve(originAccountCurrentBalance);
    });

    // Setting origin account new balance
    jest.spyOn(accountData, 'setBalance').mockImplementationOnce((accountID, amount) => {
        return Promise.resolve({
            id: accountID,
            balance: amount,
        });
    });

    // Querying origin account balance -> new account scenario
    jest.spyOn(accountData, 'getBalance').mockImplementationOnce((accountID) => {
        return Promise.resolve(undefined);
    });

    // Creating new account with destination ID and balance
    jest.spyOn(accountData, 'createAccount').mockImplementationOnce((accountID, initialBalance) => {
        return Promise.resolve({
            id: accountID,
            balance: initialBalance
        });
    });

    const transactionResult = await eventService.handleEvent(eventType, transactionData);

    expect(transactionResult.origin.balance).toEqual(originAccountNewBalance);
    expect(transactionResult.destination.balance).toEqual(destinationAccountNewBalance);
});

it('should transfer money between accounts - destination account existent scenario', async () => {
    const eventType = eventService.supportedEvents.TRANSFER;
    const transactionData = { "origin":"100", "amount":15, "destination":"300" };
    const originAccountCurrentBalance = 15;
    const destinationAccountCurrentBalance = 51;
    const originAccountNewBalance = originAccountCurrentBalance - transactionData.amount;
    const destinationAccountNewBalance = destinationAccountCurrentBalance + transactionData.amount;

    // Querying origin account balance
    jest.spyOn(accountData, 'getBalance').mockImplementationOnce((accountID) => {
        return Promise.resolve(originAccountCurrentBalance);
    });

    // Setting origin account new balance
    jest.spyOn(accountData, 'setBalance').mockImplementationOnce((accountID, amount) => {
        return Promise.resolve({
            id: accountID,
            balance: amount,
        });
    });

    // Querying origin account balance -> existing destination account scenario
    jest.spyOn(accountData, 'getBalance').mockImplementationOnce((accountID) => {
        return Promise.resolve(destinationAccountCurrentBalance);
    });

    // Setting destination account new balance
    jest.spyOn(accountData, 'setBalance').mockImplementationOnce((accountID, amount) => {
        return Promise.resolve({
            id: accountID,
            balance: amount,
        });
    });

    const transactionResult = await eventService.handleEvent(eventType, transactionData);

    expect(transactionResult.origin.balance).toEqual(originAccountNewBalance);
    expect(transactionResult.destination.balance).toEqual(destinationAccountNewBalance);
});