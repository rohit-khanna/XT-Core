const ServiceClass = require("./CustomerService");

let servInstance = new ServiceClass();

let ID = new Date().getTime();
console.log('ID:',ID);

// Create  New Customer
servInstance
  .createNewCustomer("Vjay", "Chapati", ID)
  .then(res => console.log(res))
  .catch(e => console.log(e));


  // Update CUstomer: Add new Order
setTimeout(() => {
  servInstance
    .addNewOrderForCustomer(ID, "Rice With Something")
    .then(res => console.log(res))
    .catch(e => console.log(e));
}, 1000);


// Fetch Report
setTimeout(() => {
    servInstance.fetchReport();
}, 2000);
