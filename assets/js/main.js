// Get required elements
const searchInput = document.getElementById("search");
const root = document.getElementById("root");
let allproduct = JSON.parse(localStorage.getItem("products"));
let cart = JSON.parse(localStorage.getItem("cartDB")) || [];
let cartDB = localStorage.setItem("cartDB", JSON.stringify(cart));
let cartContainer = document.getElementById("cartContainer");
let overlay = document.getElementById("overlay");

// Function to open cart popup
function openCartPopup() {
  cartContainer.style.display = "block";
  overlay.style.display = "block";
}
// Function to close cart popup
function closeCartPopup() {
  cartContainer.style.display = "none";
  overlay.style.display = "none";
}

// Function to show products
function ShowProducts(productsArray) {
  root.innerHTML = productsArray
    .map(({ image, title, price, id, discount }) => {
      const discountedPrice = discount
        ? (price - price * (discount / 100)).toFixed(2)
        : price.toFixed(2);
      return `
      <div class='box'>
        ${
          discount > 0
            ? `<span class="discount">${discount}% OFF</span>`
            : `<span></span>`
        }
        <div class='img-box'>
          <img class='images' src=${image}></img>
        </div>
        <div class='bottom'>
          <p>${title}</p>
          <div>
            ${
              discount
                ? `<span>$${discountedPrice}</span> <del>$${price.toFixed(
                    2
                  )}</del>`
                : `<span>$${price.toFixed(2)}</span>`
            }
          </div>
          <button onclick='addToCart(${id})'>Add to cart</button>
        </div>
      </div>`;
    })
    .join("");
}

ShowProducts(products);

// search input
searchInput.addEventListener("keyup", () => {
  const filteredProducts = products.filter((el) =>
    el.title.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  ShowProducts(filteredProducts);
});

// ! Add product to cart

const addToCart = (id) => {
  cart.push({ ...allproduct[id] });
  localStorage.setItem("cartDB", JSON.stringify(cart));
  displayCart();
};

// ! remove product from cart

const delElement = (a) => {
  cart.splice(a, 1);
  localStorage.setItem("cartDB", JSON.stringify(cart));
  displayCart();
};

// ! Display cart

const displayCart = () => {
  let total = 0,
    j = 0;
  
  //*** Display Product Count

  document.getElementById("count").innerHTML = JSON.parse(
    localStorage.getItem("cartDB")
  ).length;

  document.getElementById("total").innerHTML = `$ ${0}.00`;

  //*** Check if the cart is empty Or display the cart content from local storage

  if (cart.length == 0) {
    document.getElementById("cartItem").innerHTML = "Your cart is empty";
  } else {
    document.getElementById("cartItem").innerHTML = JSON.parse(
      localStorage.getItem("cartDB")
    )
      .map(({ image, title, price, discount }) => {
        //*** Total Price
        total =
          discount > 0
            ? total + (price - price * (discount / 100))
            : total + price;
        document.getElementById("total").innerHTML = `$ ${total}`;

        return `<div class='cart-item'>
            <div class='row-img'>
              <img class='rowImg' src= ${image}>
            </div>
            <p style='font-size:12px'>${title}</p>
            <h2 style='font-size:15px'>$ ${(
              price -
              price * (discount / 100)
        ).toFixed(2)}</h2>
            <img src="./assets/img/delete-icon.svg" onclick='delElement(${j++})'/>
            </div>`;
      })
      .join("");
  }
};
displayCart();
