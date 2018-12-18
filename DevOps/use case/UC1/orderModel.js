/** 
* PURPOSE      :  Order Model 

* AUTHOR       :   Rohit Khanna
*
* LICENSE      :   PUBLIC
*
*/

class Order {
  constructor(description) {
    this.id = new Date().getTime();
    this.description = description;
    this.price = description.toString().split("").length;
  }
}

module.exports=Order;
