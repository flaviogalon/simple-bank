const accountData = require('./account-data');

let accountID = '123456';
let initialBalance = 112233;
let account;

beforeEach(async () => {
    accountData.dropTable();

    account = await accountData.createAccount(
        accountID,
        initialBalance
    );
});

test('createAccount should create an object with accountID and initial balance', async () => {
    expect(account.id).toEqual(accountID);
    expect(account.balance).toEqual(initialBalance);
});

test('getBalance should return balance for given accountID', async () => {
    const balance = await accountData.getBalance(accountID);

    expect(balance).toEqual(initialBalance);
});

test('getBalance should return undefined if account does not exist', async () => {
    const balance = await accountData.getBalance('666');

    expect(balance).toEqual(undefined);
});

test('setBalance should modify an account balance field', async () => {
    const newBalance = 1;
    const account = await accountData.setBalance(
        accountID,
        newBalance
    );

    expect(account.balance).toEqual(newBalance)
});
