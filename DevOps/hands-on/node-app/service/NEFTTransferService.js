const repository = require("../repository/NoSQLAccountRepository");

class NEFTTransferService {
  constructor() {
    console.log("Creating instance of NEFTTransferService ");
  }

  transfer(amount, fromAccount, toAccount) {
    console.log("Txn Begin");
    const sqlRepo = new repository();

    const fromAcc = sqlRepo.loadAccount(fromAccount);
    const toAcc = sqlRepo.loadAccount(toAccount);
    console.log("Before Service Commit");
    console.log("fromAcc Balance:", fromAcc.balance);
    console.log("toAcc Balance:", toAcc.balance);

    fromAcc.balance -= amount;
    toAcc.balance += amount;

    sqlRepo.updateAccount(fromAcc);
    sqlRepo.updateAccount(toAcc);

    console.log("After Service Commit");
    console.log("fromAcc Balance:", fromAcc.balance);
    console.log("toAcc Balance:", toAcc.balance);
  }
}

module.exports = NEFTTransferService;
