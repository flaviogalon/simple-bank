const express = require('express');
const balanceRoute = require('./routes/balance-route');
const errorHandling = require('./middleware/error-handling');

const app = express();

// Express built in middleware to parse incoming requests with JSON payload
app.use(express.json());

app.use('/', balanceRoute);

// Middleware to handle errors
app.use(errorHandling);

app.listen(3000);