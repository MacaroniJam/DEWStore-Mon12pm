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
            `;


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


    const placeOrderButton = document.getElementById("placeOrder");
    placeOrderButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const paymentMethod =
            document.getElementById("paymentMethodDesktop")?.value ||
            document.getElementById("paymentMethodMobile")?.value;
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        if (confirm("Are you sure you want to place the order?")) {
            // Simulate order placement
            alert("Order placed successfully!");

            // Clear cart and update storage
            cart = [];
            saveCart();
            updateTotal();
            const paymentMethodDesktop = document.getElementById("paymentMethodDesktop");
            const paymentMethodMobile = document.getElementById("paymentMethodMobile");
            paymentMethodDesktop.selectedIndex = 0; // Reset payment method selection
            paymentMethodMobile.selectedIndex = 0; // Reset payment method selection

            cartContainer.innerHTML = "";
        }

    });

});