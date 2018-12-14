/**
 * PURPOSE      :  This is the Shopping Cart Service. This will be Presented to UI.
 *
 * NOTES/COLOR SCHEME    :
 *
 * AUTHOR       :   Rohit Khanna
 *
 * LICENSE      :   PUBLIC
 *
 */

import ShoppingCart from "../model/ShoppingCart";
import ProductService from "../services/ProductService";
import FetchDAL from "../services/FetchDAL";

class ShoppingCartService {
  constructor(productService) {
    this.cart = new ShoppingCart();
    if (!productService) {

      let f = new FetchDAL("http://localhost:3000/products");
      this.productService = new ProductService(f);
    } else {
      this.productService = productService;
    }
  }

  /**
   * Load Sample Product Data
   */
  async __loadSampleProductData() {
    //1. Fetch Products
    let productArray = await this.productService.findAllProductsAsync();

    //2. Create CartProducts  //3. Initial Fillup of Cart
    productArray.forEach(ele => {
      this.cart.addProduct(
        ele.id,
        ele.availableSizes[0],
        ele.availableColors[0],
        ele.price
      );
    });
  }

  /**
   * Change the Product Quanity In Cart
   * @param {*} id
   * @param {*} newQty
   */
  changeProductQuanity(id, newQty) {
    this.cart.editProduct(id, null, null, newQty);
  }

  /**
   * Change Product Color in cart
   * @param {*} id
   * @param {*} newColor
   */
  changeProductColor(id, newColor) {
    this.cart.editProduct(id, newColor, null, null);
  }

  /**
   * Change Product Size in cart
   * @param {*} id
   * @param {*} newSize
   */
  changeProductSize(id, newSize) {
    this.cart.editProduct(id, null, newSize, null);
  }

  /**
   * Apply Promo Code
   * @param {*} promoCode
   */
  applyPromoCode(promoCode) {
    this.cart.applyPromoCode(promoCode);
  }

  /**
   * Apply Shipping Charge
   * @param {number} charge
   */
  applyShippingCharge(charge) {
    this.cart.applyShippingCharge(charge);
  }
}

export default ShoppingCartService;
