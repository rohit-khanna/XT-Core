const DAL = require("./DAL");
let dalObj = new DAL("data.json");

class CustomerService {
  constructor() {}

  /**
   * Returns a Promise
   * @param {*} customerName
   * @param {*} orderDesc
   */
  createNewCustomer(customerName, orderDesc, id) {
    return new Promise((resolve, rej) => {
      dalObj
        .createCustomer(customerName, orderDesc, id)
        .then(res => {
          resolve("Customer Created", res);
        })
        .catch(e => rej(e));
    });
  }

  addNewOrderForCustomer(customerId, orderDesc) {
    return new Promise((resolve, rej) => {
      dalObj
        .addCustomerOrder(customerId, orderDesc)
        .then(res => {
          resolve(res);
        })
        .catch(e => rej(e));
    });
  }

  fetchReport() {
    return new Promise((resolve, rej) => {
      dalObj.GetFileDataAsJson().then(response => {
        let customers = response.customers || [];

        customers.forEach(cust => {
          console.log(cust.name);
          console.log("ORDERS->");
          let val = 0;
          cust.orders.forEach(ord => {
            console.log("  #", ord.description, "  $" + ord.price + ".00");
            val += ord.price;
          });
          console.log("------------------------------");
          console.log("Total Cost: $", val + ".00");

          console.log("------------------------------");
        });

        resolve(true);
      });
    });
  }
}

module.exports = CustomerService;
