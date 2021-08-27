const accountData = require('../data/account-data');

async function resetData() {
    accountData.dropTable();
    return Promise.resolve();
}

module.exports = {
    resetData,
}