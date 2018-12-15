import obj from "../../backend/services/ShoppingCartService";
let cart = obj.cart;

$(function() {
  console.log("JQuery Ready");

  registerEventMethods();
  initializeShoppingCartPage();
});

/**
 * methods to register html element events for this cart
 */
function registerEventMethods() {
  $(".checkout-button>div>.button--primary").on("click", function() {
    alert("Checkout Button Clicked");
  });

  $(".checkout-button>div>.button--link").on("click", function() {
    alert("Continue Shopping Button Clicked");
  });

  $("#btnApplyCode").on("click", function(e) {
    let promoCodeValue = $("#txtPromo").val();
    if (promoCodeValue) {
      alert(promoCodeValue);
    }
  });
}

/**
 * function to Initialize the Shopping Cart and Load Initial Data
 */
async function initializeShoppingCartPage() {
  let c = await fetchServerCartInstance();
  console.log(cart);

  if (cart) {
    //1. Create List Items
    createItemList();

    //2. Update UI Totals
    updateUITotals();
  } else {
    alert("cart not ready");
  }
}

/**
 * function to create List Items for ItemsList
 */
function createItemList() {
  //fetch UL element
  let itemsList = $(".section-items__list");

  //for each cart product in cart
  cart.cartProducts.forEach(prod => {
    let listItem = getListItemHTML(prod);
    itemsList.append(listItem);
  });
}

/**
 * function to update the UI totals
 */
function updateUITotals() {
  $(".cart-header__item-count--value").text(cart.itemCount);
  $("#subtotal>.price>.price__value").text(parseFloat(cart.subTotal).toFixed(2));
  $("#discount>.price>.price__value").text(cart.promoCodeDiscount);
  $("#estimatedTotal>.price>.price__value").text(cart.estimatedTotal);
}

/**
 * function to fetch the ServerCart INstance and load Mock Data onto DB.
 * This sets the 'cart' variable
 */
async function fetchServerCartInstance() {
  //cart = getMockData();
  return new Promise(async (resolve, reject) => {
    // var cartInstance = new ShoppingCartService("");
    //console.log(this.cartInstance);
    console.log("INsode");

    let c = await obj.__loadSampleProductData();
    debugger;
    resolve(c);
  });
}

function getMockData() {
  let obj = {
    cartProducts: [
      {
        id: 909090,
        quantity: 1,
        specialPrice: 67.88,
        size: "M",
        color: "RED",
        description: "Green Shirt",
        price: 150,
        image: "images/jacket.jpg",
        style: "1212"
      },
      {
        id: 909091,
        quantity: 1,
        specialPrice: 0,
        size: "M",
        color: "BLACK",
        description: "Green Skirt",
        price: 150,
        image: "images/skirt.jpg",
        style: "1212"
      }
    ],
    itemCount: 2,
    subTotal: 500.05,
    shippingCharge: 0,
    estimatedTotal: 500.76,
    promoCodeDiscount: 0
  };

  return obj;
}

/**
 * Function to Create and return
 * a ListItem stringnusing the input object
 * @param {*} param0
 */
function getListItemHTML({
  quantity,
  id,
  size,
  color,
  prodDetails,
  price,
  specialPrice
}) {
  return `<li class="section-items__listitem" data-id=${id} id=${id}>
  <article class="section-items__listitem-box">
    <!-- FB1 -->
    <img
      alt="item image"
      src=${prodDetails.image}
      class="item-image"
    />
    <section class="item">
      <!-- FB2 -->
      <div class="item__detail">
        <div tabindex="5" class="item__detail--description">
          ${prodDetails.description}
        </div>
        <div tabindex="6" class="item__detail--style">${prodDetails.style}</div>
        <div tabindex="7" class="item__detail--color">
          Color: <span> ${color} </span>
        </div>
      </div>
      <div class="container">
        <div
          tabindex="8"
          aria-label="Size:M"
          class="item__size"
        >
          <span> Size: </span> <span>${size}</span>
        </div>
        <div class="item__quantity">
          <label for="item__quantity__value"
            ><span> qty: </span></label
          >
          <input
            id="item__quantity__value"
            type="number"
            min="1"
            tabindex="9"
  value=${quantity}
            name="Quantity of item"
            aria-label="item quantity"
            class="item__quantity__value"
          />
        </div>
        <div class="item__price">
          <div
            class="price"
            tabindex="10"
            aria-label="item price: $79.00"
          >
          ${
            specialPrice > 0
              ? ` <span class="price__curr--strike">$</span>
          <span class="price__value--strike"><s>${prodDetails.price}</s></span>
            <p>
            <div class="price__curr">$</div>
            <div class="price__value">${specialPrice}</div>
            </p>
          </div>`
              : `
            <div class="price__curr">$</div>
            <div class="price__value">${prodDetails.price}</div>
         
          </div>`
          }
         
        </div>
      </div>
      <div class="section-items__listitem-action lg">
        <button class="button button--action rb">Edit</button>
        <button class="button button--action rb">X Remove</button>
        <button class="button button--action">Save for Later</button>
      </div>
    </section>
  </article>
  <div class="section-items__listitem-action sm">
    <button class="button button--action rb">Edit</button>
    <button class="button button--action rb">X Remove</button>
    <button class="button button--action">Save for Later</button>
  </div>
</li>`;
}
