# Simple Bank
A simple NodeJS + [express](https://expressjs.com/pt-br/) bank API that handles balace checking, deposits, withdraws and transfer.

---

# Operations
## Deposit
- When depositing into a non existent account, will create one with the deposit balance.
- When depositing into an existing account, will update its balance to originalBalance + deposit value.
  - Negative deposits are not dealt with.

## Balance check
- Will query the balance for a given account. If the account doesn't exist, throws error.

---

# Tools / Libraries used
- Node.js 14.17.5
- Express: web framework
- Jest: test runner
- nodemon: hot-reloader for node.js apps