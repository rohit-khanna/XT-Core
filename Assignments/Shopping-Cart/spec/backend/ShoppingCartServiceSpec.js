/**
 * PURPOSE      :  This is the Test Suite for Shopping Cart Service.
 *
 * AUTHOR       :   Rohit Khanna
 *
 * LICENSE      :   PUBLIC
 *
 */
import FetchDAL from "../../backend/services/FetchDAL";
import Product from "../../backend/model/Product";
import ProductService from "../../backend/services/ProductService";
import ShoppingCartService from "../../backend/services/ShoppingCartService";

describe("shopping-cart-service", function() {
  let shoppingCartService;
  let productService;
  var originalTimeout;

  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  describe("when Product Service with FetchDAL is used", function() {
    productService = new ProductService(
      new FetchDAL("http://localhost:3000/products")
    );

    beforeEach(async function() {
      await productService.saveProductAsync(
        new Product(
          "PROD-1",
          ["red", "green", "BLUE"],
          ["M", "s", "l"],
          "Style#443",
          200,
          909090
        )
      );
      await productService.saveProductAsync(
        new Product(
          "PROD-2",
          ["BLACK", "BLUE", "OLIVE"],
          ["M", "XL", "l", "xxl"],
          "Style#43",
          300,
          909091
        )
      );
    }); // end beforewach

    fit("should return Shopping Cart Object with 2 products", async function() {
      //Arrange
      shoppingCartService = new ShoppingCartService(productService);
      await shoppingCartService.__loadSampleProductData();
      let cart = shoppingCartService.cart;
      //Act //Assert
console.log(cart);

      expect(cart.cartProducts.findIndex(e => e.id == 909091) >= 0).toBe(true);
      expect(cart.cartProducts.findIndex(e => e.id == 909091) >= 0).toBe(true);
    });

    it("should allow change Color of Product", async function() {
      //Arrange
      shoppingCartService = new ShoppingCartService(productService);
      await shoppingCartService.__loadSampleProductData();

      //Act
      shoppingCartService.changeProductColor(909091, "OLIVE");
      let cart = shoppingCartService.cart;
      //Assert

      expect(cart.cartProducts.find(e => e.id == 909091).color).toBe("OLIVE");
    });

    it("should allow change size of Product", async function() {
      //Arrange
      shoppingCartService = new ShoppingCartService(productService);
      await shoppingCartService.__loadSampleProductData();

      //Act
      shoppingCartService.changeProductSize(909091, "XXL");
      let cart = shoppingCartService.cart;
      //Assert

      expect(cart.cartProducts.find(e => e.id == 909091).size).toBe("XXL");
    });

    it("should allow change Quantity of Product", async function() {
      //Arrange
      shoppingCartService = new ShoppingCartService(productService);
      await shoppingCartService.__loadSampleProductData();

      //Act
      shoppingCartService.changeProductQuanity(909091, 2);
      let cart = shoppingCartService.cart;

      //Assert

      expect(cart.cartProducts.find(e => e.id == 909091).quantity).toBe(2);
    });

    it("should allow check Price of Cart when applied with RK01 Coupon and SHipping of 5", async function() {
      //Arrange
      shoppingCartService = new ShoppingCartService(productService);
      await shoppingCartService.__loadSampleProductData();

      //Act
      shoppingCartService.applyPromoCode("RK01");
      shoppingCartService.applyShippingCharge(5);
      let cart = shoppingCartService.cart;

      //Assert

      expect(cart.estimatedTotal).toBe(495); // 200+300-10+5
    });

    afterEach(async function() {
      await productService.deleteProductAsync(909090);
      await productService.deleteProductAsync(909091);
      shoppingCartService = null;
    }); // end after each
  }); // end describe
});
