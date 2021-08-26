const balanceService = require('./balance-service');
const accountData = require('../data/account-data');

it('should return the balance for given accountID', async () => {
    const expectedValue = 10;

    jest.spyOn(accountData, 'getBalance').mockImplementationOnce((accountID) => {
        return Promise.resolve(expectedValue);
    });

    const balance = await balanceService.getBalance('12');
    expect(balance).toEqual(expectedValue);
});