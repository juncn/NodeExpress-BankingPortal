const express = require('express');
const { accounts, writeJSON } = require('../data');

const router = express.Router();

router.get('/transfer', (req, res) => {
  res.render('transfer');
});

router.post('/transfer', (req, res) => {
  // Calculate and set the FROM and TO balance
  // Convert account data to JSON
  accounts[req.body.from].balance =
    accounts[req.body.from].balance - parseInt(req.body.amount);
  accounts[req.body.to].balance =
    accounts[req.body.to].balance + parseInt(req.body.amount);

  // Write account data to JSON file
  writeJSON();

  res.render('transfer', { message: 'Transfer Completed' });
});

router.get('/payment', (req, res) => {
  res.render('payment', { account: accounts.credit });
});

router.post('/payment', (req, res) => {
  accounts.credit.balance = accounts.credit.balance - parseInt(req.body.amount);
  accounts.credit.available =
    accounts.credit.available + parseInt(req.body.amount);
  writeJSON();
  res.render('payment', {
    message: 'Payment Successful',
    account: accounts.credit
  });
});

module.exports = router;
