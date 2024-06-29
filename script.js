let btnCart = document.querySelector("#count-icon");
let cart = document.querySelector(".cart");
let btnClose = document.querySelector("#close-btn");

btnCart.addEventListener("click", showCart);
function showCart() {
  cart.classList.add("cart-active");
}
btnClose.addEventListener("click", () => {
  cart.classList.remove("cart-active");
});

document.addEventListener("DOMContentLoaded", loadFood);

function loadFood() {
  loadContent();
}
function loadContent() {
  //remove food items from cart
  let btnRemove = document.querySelectorAll(".cart-remove");
  btnRemove.forEach((btn) => btn.addEventListener("click", removeItem));
  //Product item chage event
  let qtyElement = document.querySelectorAll(".cart-quantity");
  qtyElement.forEach((input) => input.addEventListener("change", changeQty));
  //add to cart
  let cartBtns = document.querySelectorAll(".add-cart");
  cartBtns.forEach((btn) => {
    btn.addEventListener("click", addToCart);
  });
  updateTotal();
}

//remove cart item function

function removeItem(event) {
  if (confirm("Are you Sure to Remove")) {
    let title = this.parentElement.querySelector(".cart-food-title").innerHTML;
    itemList = itemList.filter((el) => el.title != title);
    event.target.parentElement.remove();
    loadContent();
  }
}
// chnage quantity
function changeQty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  loadContent(); //for cart item increase price
}

let itemList = [];
//add cart function
let cartCount = document.querySelector(".cart-count");

function addToCart() {
  let food = this.parentElement;
  let title = food.querySelector(".food-title").innerHTML;
  let price = food.querySelector(".food-price").innerHTML;
  let imgSrc = food.querySelector(".food-img").src;
  //
  let newProduct = { title, price, imgSrc };
  //check validate product duplicate
  if (itemList.find((el) => el.title == newProduct.title)) {
    alert("Product already in cart");
    return;
  } else {
    alert(newProduct.title + " added to cart");
    itemList.push(newProduct);
    cartCount.textContent = itemList.length;

  }
  let newProductElement = createCartProduct(title, price, imgSrc);
  let element = document.createElement("div");
  element.innerHTML = newProductElement;
  let cartBasket = document.querySelector(".cart-content");
  cartBasket.append(element);
  loadContent();
}
//cart product add function
function createCartProduct(title, price, imgSrc) {
  return `
            <div class="cart-box">
              <img src="${imgSrc}" class="cart-img" alt="img" />
              <div class="detail-box">
                <div class="cart-food-title">${title}</div>
                <div class="price-box">
                  <div class="cart-price">${price}</div>
                  <div class="cart-amt">${price}</div>
                </div>
                <input type="number" value="1" class="cart-quantity" />
              </div>
              <ion-icon name="trash" class="cart-remove"></ion-icon>
            </div>
    `;
}
function updateTotal() {
  let cartItem = document.querySelectorAll(".cart-box");
  let totalValue = document.querySelector(".total-price");
  let total = 0;
  cartItem.forEach((product) => {
    let priceElement = product.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("Rs.", ""));
    let qty = product.querySelector(".cart-quantity").value;
    total = total + price * qty;
    product.querySelector(".cart-amt").innerHTML = "Rs." + price * qty;
  });
  totalValue.innerHTML = "Rs." + total;
}
