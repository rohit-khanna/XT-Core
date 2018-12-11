const Account = require("../models/Account");

class SQLAccountRepository {
  constructor() {
    console.log("SQLAccountRepository instance Created");
  }

  loadAccount(num) {
    console.log("Loading Account No:", num);
    return new Account(num, 10000.0);
  }

  updateAccount(account) {
    console.log("Updating Account Number:", account.num);
  }
}

module.exports = SQLAccountRepository;
