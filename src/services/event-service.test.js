const eventService = require('./event-service');

it('should create a new account with initial balance', async () => {
    const eventType = 'deposit';
    const transactionData = { "destination":"100", "amount":10 };
    const transactionResult = await eventService.handleEvent(eventType, transactionData);

    expect(transactionResult.destination.id).toEqual(transactionData.destination);
    expect(transactionResult.destination.balance).toEqual(transactionData.amount);
});