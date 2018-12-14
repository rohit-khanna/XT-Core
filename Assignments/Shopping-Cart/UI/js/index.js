import ShoppingCartService from "../../backend/services/ShoppingCartService";
// console.log(ShoppingCartService);

//

// // const dal = require("../../backend/services/FetchDAL");

// // let obj = new dal("http://localhost:3000/products");

// // console.log(obj);
// // obj.test();

// // async function t() {
// //   let r = await obj.findAll();
// //   let w=await r.json();
// //   console.log(w);
// // }

// //  t();

async function g(serviceInstance) {
  await serviceInstance.__loadSampleProductData();
  console.log(serviceInstance);
}
// g();

$(function() {
  console.log("JQuery Ready");
  // fetch Product Data
  var serviceInstance = new ShoppingCartService();
  g(serviceInstance);

  let cart = serviceInstance.cart;
  //1. Create List Items
  createItemList(cart.cartProducts);

  //2. Update UI Totals
  updateUITotals(cart);
});

function createItemList() {
  //ToDo
}

function updateUITotals(cart) {
    //ToDo
}
