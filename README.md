# Simple Bank
A simple NodeJS + [express](https://expressjs.com/pt-br/) bank API that handles balace checking, deposits, withdraws and transfer.

---

# How to run
## 1. Install project dependencies

```$ npm install```

## 2. Start web server
- Hot reload:

  ```$ npm run dev```

- Normal process

  ```$ node src/server.js```

---

# How to test
Run

```$ npm test```

---

# Operations
## Deposit
- When depositing into a non existent account, will create one with the deposit balance.
- When depositing into an existing account, will update its balance to originalBalance + deposit value.
  - Negative deposits are not dealt with.

Example:

```POST /event {"type":"deposit", "destination":"100", "amount":10}```

## Balance check
- Will query the balance for a given account. If the account doesn't exist, returns 404.

Example:

```GET /balance?account_id=1234```

## Withdraw
- When withdrawing from a non existent account, will respond with 404.
- When withdrawing from an existent account, will update its balance discouting the withdrawn value;
  - Negative withdraws are not dealt with.

Example:

```POST /event {"type":"withdraw", "origin":"200", "amount":10}```

## Transfer
- When transfering from a non existent account, will respond with 404.
- When transfering from an existent account, will discount the amount to be transfered from origin's account balance and sum it to the destination's account balance.
  - Negative transfers are not dealt with.
  - If the destination account doesn't exist, a new one will be created.

Example:

```POST /event {"type":"transfer", "origin":"100", "amount":15, "destination":"300"}```

## Reset
- Will clean up the mocked data layer.

Example:

```POST /reset```

---

# Tools / Libraries used
- Node.js 14.17.5
- Express: web framework
- Jest: test runner
- nodemon: hot-reloader for node.js apps