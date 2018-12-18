/** 
* PURPOSE      :  This is the DAL class for interacting with data.JSON 

*
* AUTHOR       :   Rohit Khanna
*
* LICENSE      :   PUBLIC
*
*/

const Customer = require("./customerModel");
const Order = require("./orderModel");
const fs = require("fs");

class DAL {
  constructor(dbFileName) {
    this.filename = "data.json";
  }

  createCustomer(name, orderDesc, id) {
    return new Promise((resolve, reject) => {
      let newCust = new Customer(name, id);
      let newID = newCust.id;
     

      
      newCust.orders.push(new Order(orderDesc));
      this.createCustomerInDb(newCust, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(newCust);
        }
      },newID);
    });
  }

  createCustomerInDb(custObj, cb) {
    try {
        let id=custObj.id;
      fs.readFile(this.filename, (err, data) => {
        if (err) {
          throw err;
        }
        let dataJson = JSON.parse(data);
        let customerArray = dataJson.customers || [];
        customerArray.push(custObj);
        dataJson.customers = customerArray;
        let buff = Buffer.from(JSON.stringify(dataJson));

        fs.writeFile(this.filename, buff, err => {
          if (err) return cb(err, null);
          return cb(null, id);
        });
      });
    } catch (e) {
      cb("Error in createCustomerInDb():" + e, null);
    }
  }

  UpdateCustomerOrder(order, custId, cb) {
    this.GetFileDataAsJson().then(res => {
      let cust = res.customers.find(x => x.id == custId);
      if (!cust) cb("Customer not found");
      cust.orders.push(order);

      //console.log(res);

      let buff = Buffer.from(JSON.stringify(res));

      fs.writeFile(this.filename, buff, err => {
        if (err) return cb(err, null);
        return cb(null, true);
      });
    });
  }

  addCustomerOrder(custId, orderDesc) {
    return new Promise((resolve, reject) => {
      this.GetFileDataAsJson().then(res => {
        this.UpdateCustomerOrder(new Order(orderDesc), custId, function(
          err,
          data
        ) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    });
  }

  

  async GetFileDataAsJson() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filename, (err, data) => {
        if (err) {
          reject(err);
        }
        let dataJson = JSON.parse(data);
        let customerArray = dataJson.customers || [];
        dataJson.customers = customerArray;
        resolve(dataJson);
      });
    });
  }
}

module.exports = DAL;
