const fs = require('fs');
const path = require('path');
const express = require('express');
const { accounts, users, writeJSON } = require('./data');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Index route
app.get('/', (req, res) => {
  res.render('index', { title: 'Account Summary', accounts: accounts });
});



app.get('/profile', (req, res) => {
  res.render('profile', { user: users[0] });
});

app.get('/transfer', (req, res) => {
  res.render('transfer');
});

app.post('/transfer', (req, res) => {
  // Calculate and set the FROM and TO balance
  // Convert account data to JSON
  accounts[req.body.from].balance = accounts[req.body.from].balance - parseInt(req.body.amount);
  accounts[req.body.to].balance = accounts[req.body.to].balance + parseInt(req.body.amount);

  // Write account data to JSON file
  writeJSON();

  res.render('transfer', { message: 'Transfer Completed' });
});

app.get('/payment', (req, res) => {
  res.render('payment', { account: accounts.credit });
});

app.post('/payment', (req, res) => {
  accounts.credit.balance = accounts.credit.balance - parseInt(req.body.amount);
  accounts.credit.available = accounts.credit.available + parseInt(req.body.amount);
  writeJSON();
  res.render('payment', {
    message: 'Payment Successful',
    account: accounts.credit
  });
});

app.listen(3000, () => console.log('PS Project Running on port 3000!'));
