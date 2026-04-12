/*Question 2ei1. Shopping cart must include, product details along with the taxes, discounts, subtotal and current total cost. */
document.addEventListener("DOMContentLoaded", () => {
    // Placing all cart items in the checkout page by looping through cart and creating elements for each game in the cart
    // Within selected div
    const cartContainer = document.getElementById("cartContainer");

    cart.forEach(gameId => {
        const game = games.find(g => g.id === gameId);

        if (!game) return;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${game.fullImage}" alt="${game.title}">
            <div class="cart-info">
                <h3>${game.title}</h3>
                <h3>${game.price}</h3>
            </div>
            <button class="remove-btn">Remove</button>
        `;

        // Remove item from cart
        cartItem.querySelector(".remove-btn").addEventListener("click", () => {
            removeFromCart(game.id);
            cartItem.remove();
            updateTotal();
        });

        cartContainer.appendChild(cartItem);
    });


    // Update total price
    function updateTotal() {
        let total = 0;

        cart.forEach(gameId => {
            const game = games.find(g => g.id === gameId);
            if (!game) return;

            total += parseFloat(game.price.replace("$", ""));
        });

        document.getElementById("totalPrice").textContent = `$${total.toFixed(2)}`;
    }

    updateTotal();



    // Remove all items from cart and update page
    document.getElementById("removeAll").addEventListener("click", () => {
        cart = [];
        saveCart();
        updateTotal();

        document.getElementById("cartContainer").innerHTML = "";
    });

});