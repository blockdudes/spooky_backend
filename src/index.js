// Import necessary modules
const express = require('express');
const ethers = require('ethers');
const app = express();
const port = 3000;
const seponserRouter = require('./routes/sponserRouter');
const borrowListRouter = require('./routes/borrowList');
const transactionHistoryRouter = require('./routes/transactionHistory');



// Middleware setup
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// routes
app.use('/api', seponserRouter);
app.use('/api', borrowListRouter);
app.use('/api', transactionHistoryRouter);

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});