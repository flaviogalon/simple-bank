const balanceService = require('./balance-service');
const accountData = require('../data/account-data');
const { NonExistentAccountError } = require('../errors/errors');

it('should return the balance for given accountID', async () => {
    const expectedValue = 10;

    jest.spyOn(accountData, 'getBalance').mockImplementationOnce((accountID) => {
        return Promise.resolve(expectedValue);
    });

    const balance = await balanceService.getBalance('12');
    expect(balance).toEqual(expectedValue);
});

it('should throw NonExistentAccountError when fetching balance from non existing account', async () => {

    jest.spyOn(accountData, 'getBalance').mockImplementationOnce((accountID) => {
        return Promise.resolve(undefined);
    });

    await expect(balanceService.getBalance("12121"))
    .rejects
    .toThrowError(NonExistentAccountError);
});