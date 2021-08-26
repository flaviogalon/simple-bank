/*
Schema:
        account_id<string> : {
            id<string>,
            balance<int>,
        }

        e.g.:

        '1234': {
            id: '1234',
            balance: 123,
        }
*/

let databaseMock = {};

function dropTable() {
    databaseMock = {};
}

function createAccount(accountID, initialBalance) {
    return new Promise(resolve => {
        databaseMock[accountID] = {
            id: accountID,
            balance: initialBalance,
        };
        resolve(databaseMock[accountID]);
    });
}

function getBalance(accountID) {
    return new Promise(resolve => {
        resolve(databaseMock[accountID].balance);
    });
}

function setBalance(accountID, amount) {
    return new Promise(resolve => {
        databaseMock[accountID].balance = amount;
        resolve(databaseMock[accountID]);
    })
}

module.exports = {
    dropTable,
    createAccount,
    getBalance,
    setBalance,
}