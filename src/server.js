const express = require('express');
const balanceRoute = require('./routes/balance-route');
const eventRoute = require('./routes/event-route');
const resetRoute = require('./routes/reset-route');
const errorHandling = require('./middleware/error-handling');

const app = express();

// Express built in middleware to parse incoming requests with JSON payload
app.use(express.json());

app.use('/', balanceRoute);
app.use('/', eventRoute);
app.use('/', resetRoute);

// Middleware to handle errors
app.use(errorHandling);

app.listen(3000);