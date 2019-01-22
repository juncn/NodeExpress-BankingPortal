const fs = require('fs');
const path = require('path');

// Read account data
const accountData = fs.readFileSync('src/json/accounts.json', 'utf8');
const accounts = JSON.parse(accountData);

// Read user data
const userData = fs.readFileSync('src/json/users.json', 'utf8');
const users = JSON.parse(userData);

const writeJSON = () => {
  const accountsJSON = JSON.stringify(accounts);

  // Write account data to JSON file
  fs.writeFileSync(
    path.join(__dirname, 'json/accounts.json'),
    accountsJSON,
    'utf8'
  );
};

module.exports = {
  accounts,
  users,
  writeJSON
};
