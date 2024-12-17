const cartItems = [];
const cartList = document.getElementById("cart-items");
const totalPriceDisplay = document.getElementById("total-price");

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (event) => {
        const product = event.target.closest(".product");
        const productId = product.getAttribute("data-id");
        const productName = product.getAttribute("data-name");
        const productPrice = parseFloat(product.getAttribute("data-price"));

        // Add to cart
        const existingItem = cartItems.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        updateCart();
    });
});

function updateCart() {
    // Clear the cart list
    cartList.innerHTML = "";

    // Add items to the cart
    let total = 0;
    cartItems.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} x${item.quantity} - $${item.price * item.quantity}`;
        cartList.appendChild(listItem);
        total += item.price * item.quantity;
    });

    totalPriceDisplay.textContent = `Total: $${total}`;
}

document.getElementById("checkout").addEventListener("click", () => {
    if (cartItems.length > 0) {
        alert("Thank you for your purchase!");
        cartItems.length = 0;
        updateCart();
    } else {
        alert("Your cart is empty!");
    }
});
