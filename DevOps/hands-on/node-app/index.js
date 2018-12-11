const service = require("./service/NEFTTransferService");

const instance = new service();

instance.transfer(200, 1, 2);
