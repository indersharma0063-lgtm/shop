/* =========================================
   SHOPVERSE JAVASCRIPT
========================================= */


/* =========================================
   MOBILE NAVBAR
========================================= */

function toggleMenu() {

    const navbar = document.querySelector(".navbar");

    navbar.classList.toggle("active");

}


/* =========================================
   NAVBAR ACTIVE LINK
========================================= */

const navLinks =
    document.querySelectorAll(".nav-link");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.forEach(function (item) {

            item.classList.remove("active");

        });

        this.classList.add("active");

        document
            .querySelector(".navbar")
            .classList.remove("active");

    });

});


/* =========================================
   SEARCH BOX
========================================= */

function openSearch() {

    document
        .getElementById("searchBox")
        .classList.add("active");

    document
        .getElementById("searchInput")
        .focus();

}


function closeSearch() {

    document
        .getElementById("searchBox")
        .classList.remove("active");

}


/* =========================================
   SEARCH PRODUCTS
========================================= */

function searchProducts() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(function (product) {

        const name =
            product
                .querySelector("h3")
                .textContent
                .toLowerCase();

        const category =
            product
                .getAttribute("data-category")
                .toLowerCase();

        if (
            name.includes(search) ||
            category.includes(search)
        ) {

            product.classList.remove("hide");

        } else {

            product.classList.add("hide");

        }

    });

}


/* =========================================
   PRODUCT FILTER
========================================= */

function filterCategory(category) {

    const products =
        document.querySelectorAll(".product-card");

    const buttons =
        document.querySelectorAll(".filter-btn");


    buttons.forEach(function (button) {

        button.classList.remove("active");

        if (
            button.textContent.trim()
            === category
        ) {

            button.classList.add("active");

        }

    });


    products.forEach(function (product) {

        const productCategory =
            product.getAttribute("data-category");


        if (
            category === "All" ||
            productCategory === category
        ) {

            product.classList.remove("hide");

        } else {

            product.classList.add("hide");

        }

    });


    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   CART
========================================= */

let cart = [];


function addToCart(name, price) {

    const existingProduct =
        cart.find(function (item) {

            return item.name === name;

        });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            quantity: 1

        });

    }


    updateCart();

    showToast(
        name + " added to cart!"
    );

}


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    let totalItems = 0;

    let totalPrice = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    } else {

        cartItems.innerHTML = "";


        cart.forEach(function (item, index) {

            totalItems += item.quantity;

            totalPrice +=
                item.price * item.quantity;


            const cartItem =
                document.createElement("div");

            cartItem.className = "cart-item";


            cartItem.innerHTML = `

                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        ₹${item.price}
                        × ${item.quantity}
                    </p>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})">

                    Remove

                </button>

            `;


            cartItems.appendChild(cartItem);

        });

    }


    cartCount.textContent =
        totalItems;

    cartTotal.textContent =
        "₹" + totalPrice.toLocaleString("en-IN");

}


/* =========================================
   REMOVE CART ITEM
========================================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

    showToast("Product removed from cart.");

}


/* =========================================
   OPEN CART
========================================= */

function openCart() {

    document
        .getElementById("cartOverlay")
        .classList.add("active");

}


/* =========================================
   CLOSE CART
========================================= */

function closeCart() {

    document
        .getElementById("cartOverlay")
        .classList.remove("active");

}


/* =========================================
   CHECKOUT
========================================= */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add a product first."
        );

        return;

    }


    alert(
        "Thank you for shopping with ShopVerse!\n\n" +
        "Checkout system will be connected to PHP + MySQL."
    );

}


/* =========================================
   COUPON
========================================= */

function showCoupon() {

    alert(
        "🎉 Your coupon code is:\n\n" +
        "SHOP50\n\n" +
        "Use this code to get up to 50% OFF."
    );

}


/* =========================================
   NEWSLETTER
========================================= */

function subscribe() {

    const email =
        document
            .getElementById("email")
            .value
            .trim();


    if (email === "") {

        alert(
            "Please enter your email address."
        );

        return;

    }


    if (!email.includes("@")) {

        alert(
            "Please enter a valid email address."
        );

        return;

    }


    alert(
        "Thank you for subscribing to ShopVerse!"
    );


    document
        .getElementById("email")
        .value = "";

}


/* =========================================
   ABOUT BUTTON
========================================= */

function showMessage() {

    alert(
        "ShopVerse brings fashion, electronics, beauty " +
        "and home products together in one modern shopping platform."
    );

}


/* =========================================
   TOAST MESSAGE
========================================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(function () {

        toast.classList.remove("show");

    }, 2500);

}


/* =========================================
   CLOSE CART WHEN CLICKING OUTSIDE
========================================= */

document
    .getElementById("cartOverlay")
    .addEventListener("click", function (event) {

        if (
            event.target === this
        ) {

            closeCart();

        }

    });


/* =========================================
   INITIAL CART
========================================= */

updateCart();