/** 
* PURPOSE      :  This is the Model class for the Shopping Cart 

* AUTHOR       :   Rohit Khanna
*
* LICENSE      :   PUBLIC
*/

"use strict";

import CartProduct from "./CartProduct";

class ShoppingCart {
  constructor() {
    this.cartProducts = []; // can be 2 products with 2 instances each: hence count=2
    this.itemCount = 0; // will be 4
    this.promoCode;
    this.subTotal = 0;
    this.shippingCharge = 0;
    this.estimatedTotal = 0;
    this.promoCodeDiscount = 0;
  }

  /**
   *
   * @param {*} id
   * @param {*} specialPrice
   */
  addProduct(id, size, color, specialPrice) {
    let newProduct = new CartProduct(id, size, color, specialPrice);
    this.cartProducts.push(newProduct);
    this.itemCount++;
    this.incrementSubTotal(newProduct);
  }

  /**
   * method to Increment The Product Quantity in cart
   * @param {*} id cartProductId
   */
  incrementProductQuantity(id) {
    let product = this.cartProducts.find(x => x.id == id);
    product.quantity++;
    this.itemCount++;
    this.incrementSubTotal(product);
  }

  /**
   * method to Decrement The Product Quantity in cart
   * @param {*} id cartProductId
   */
  decrementProductQuantity(id) {
    let product = this.cartProducts.find(x => x.id == id);
    product.quantity--;
    this.itemCount--;
    this.decrementSubTotal(product);
  }

  /**
   * Remove the Product from Cart.
   * @param {*} id CartProductId
   */
  removeProduct(id) {
    let product = this.cartProducts.find(x => x.id == id);

    // adjust the Totals
    for (let i = 0; i < product.quantity; i++) {
      this.itemCount--;
      this.decrementSubTotal(product);
    }
    //remove from Cart
    let index = this.cartProducts.findIndex(p => p.id === id);
    this.cartProducts.splice(index, 1, undefined);
  }

  /**
   * method to Edit Cart Product
   * @param {*} newColor new Color
   * @param {*} newSize new Size
   * @param {*} newQty new Quantity: NOT IMPLEMENTED
   */
  editProduct(id, newColor, newSize, newQty) {
    let product = this.cartProducts.find(x => x.id == id);
    if (newSize) {
      product.size = newSize;
    }
    if (newColor) {
      product.color = newColor;
    }
    if (newQty) {
      let diff = newQty - product.quantity;

      if (diff == 0) {
        throw new Error("NOT HANDLED");
      } else {
        for (let i = 0; i < diff; i++) {
          diff > 0
            ? this.incrementProductQuantity(id)
            : this.decrementProductQuantity(id);
        }
      }
    }
  }

  /**
   * Increment The Cart SubTotal
   * @param {*} product Product Added
   */
  incrementSubTotal(product) {
    this.subTotal +=
      product.specialPrice != -1
        ? product.specialPrice
        : product.getProductPrice();

    //calculate Estmated Total
    this.calculateEstimatedTotal();
  }

  /**
   * Decrement The Cart SubTotal
   * @param {*} product Product Removed
   */
  decrementSubTotal(product) {
    this.subTotal -=
      product.specialPrice != -1
        ? product.specialPrice
        : product.getProductPrice();

    //calculate Estmated Total
    this.calculateEstimatedTotal();
  }

  /**
   * Calculate The Estimated Total for CART
   */
  calculateEstimatedTotal() {
    this.estimatedTotal =
      this.subTotal - this.promoCodeDiscount + this.shippingCharge;
  }

  /**
   * Apply Promo/Discount Code
   * Active: RK01,Rk02,RK03
   * @param {*} code
   */
  applyPromoCode(code) {
    if (code) {
      code = code.toUpperCase();
      this.promoCode = code;
      switch (code) {
        case "RK01":
          this.promoCodeDiscount = 10;
          break;
        case "RK02":
          this.promoCodeDiscount = 20;
          break;
        case "RK03":
          this.promoCodeDiscount = 30;
          break;
        default:
          this.promoCodeDiscount = 0;
          break;
      }

      this.calculateEstimatedTotal();
    }
  }


  /**
   * Apply Shipping Charge
   * @param {number} charge 
   */
  applyShippingCharge(charge) {
    this.shippingCharge = parseFloat(charge);

    this.calculateEstimatedTotal();
  }
}

export default ShoppingCart;
