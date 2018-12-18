/** 
* PURPOSE      :  Customer Model 

* AUTHOR       :   Rohit Khanna
*
* LICENSE      :   PUBLIC
*
*/

class Customer {
  constructor(name,id) {
    this.id = id|| new Date().getTime();
    this.name = name;
    this.orders = [];
  }
}

module.exports=Customer;
