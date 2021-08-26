const eventService = require('./event-service');
const accountData = require('../data/account-data');

beforeEach(() => {
    accountData.dropTable();
});

it('should create a new account with initial balance', async () => {
    const eventType = 'deposit';
    const transactionData = { "destination":"100", "amount":10 };
    const transactionResult = await eventService.handleEvent(eventType, transactionData);

    expect(transactionResult.destination.id).toEqual(transactionData.destination);
    expect(transactionResult.destination.balance).toEqual(transactionData.amount);
});

it('should increment an account balance', async () => {
    const eventType = 'deposit';
    const transactionData = { "destination":"100", "amount":10 };

    // Will create the account with balance = 10
    await eventService.handleEvent(eventType, transactionData);
    const transactionResult = await eventService.handleEvent(eventType, transactionData);

    expect(transactionResult.destination.balance).toEqual(20);
});