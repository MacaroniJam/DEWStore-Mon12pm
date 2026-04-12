
document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------
    // CART DISPLAY
    // -------------------------------
    const cartContainer = document.getElementById("cartContainer");

    /*Question 4. Checkout Page: Show a summary of the shopping cart with the total cost. */
    // Show all items currently in the cart
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

    // -------------------------------
    // TOTAL PRICE CALCULATION
    // -------------------------------
    function updateTotal() {
        let total = 0;

        // Add up all item prices
        cart.forEach(gameId => {
            const game = games.find(g => g.id === gameId);
            if (!game) return;
            total += parseFloat(game.price.replace("$", ""));
        });

        // Update UI with total
        document.getElementById("totalPrice").textContent = `$${total.toFixed(2)}`;

        // Update hidden fields if needed
        const amountFields = document.querySelectorAll(".amountTotal");
        amountFields.forEach(field => {
            field.value = `$${total.toFixed(2)}`;
        });

        return total;
    }
    updateTotal();

    // -------------------------------
    // PAYMENT METHOD TOGGLE
    // -------------------------------
    function toggleForm() {
        const desktopSelect = document.getElementById("paymentMethodDesktop");
        const mobileSelect = document.getElementById("paymentMethodMobile");

        // Sync dropdowns between desktop and mobile
        let paymentMethod = desktopSelect.value;
        if (!paymentMethod || paymentMethod === "" || paymentMethod === "selected") {
            paymentMethod = mobileSelect.value;
        }

        if (desktopSelect.value !== paymentMethod && paymentMethod) desktopSelect.value = paymentMethod;
        if (mobileSelect.value !== paymentMethod && paymentMethod) mobileSelect.value = paymentMethod;

        // Hide all forms first
        const creditCardForm = document.getElementById("creditCardForm");
        const debitCardForm = document.getElementById("debitCardForm");
        const paypalForm = document.getElementById("paypalForm");

        if (creditCardForm) creditCardForm.style.display = "none";
        if (debitCardForm) debitCardForm.style.display = "none";
        if (paypalForm) paypalForm.style.display = "none";

        // Show selected form
        if (paymentMethod === "creditCard" && creditCardForm) creditCardForm.style.display = "block";
        else if (paymentMethod === "debitCard" && debitCardForm) debitCardForm.style.display = "block";
        else if (paymentMethod === "paypal" && paypalForm) paypalForm.style.display = "block";
    }

    document.getElementById("paymentMethodDesktop").addEventListener("change", toggleForm);
    document.getElementById("paymentMethodMobile").addEventListener("change", toggleForm);
    toggleForm();

    // -------------------------------
    // PAYMENT INFO COLLECTION
    // -------------------------------
    function getPaymentMethodInfo() {
        const paymentMethod = document.getElementById("paymentMethodDesktop")?.value || document.getElementById("paymentMethodMobile")?.value;

        let name = "", number = "", expiration = "", email = "";
        const trn = sessionStorage.getItem("currentTRN") || "";

        // Collect fields based on selected method
        if (paymentMethod === "creditCard") {
            name = document.getElementById("creditCardName")?.value || "";
            number = document.getElementById("creditCardNumber")?.value || "";
            expiration = document.getElementById("creditCardExpiration")?.value || "";
            email = document.getElementById("creditCardEmail")?.value || "";
        } else if (paymentMethod === "debitCard") {
            name = document.getElementById("debitCardName")?.value || "";
            number = document.getElementById("debitCardNumber")?.value || "";
            expiration = document.getElementById("debitCardExpiration")?.value || "";
            email = document.getElementById("debitCardEmail")?.value || "";
        } else if (paymentMethod === "paypal") {
            email = document.getElementById("paypalEmail")?.value || "";
        }

        return { paymentMethod, name, number, expiration, email, trn };
    }

    // -------------------------------
    // TAXES & INVOICE NUMBER
    // -------------------------------
    function calculateTaxes(subtotal) {
        return subtotal * 0.15; // 15% tax
    }

    function getNextInvoiceNumber() {
        const lastNumber = Number(localStorage.getItem("LastInvoiceNumber") || "0");
        const nextNumber = lastNumber + 1;
        localStorage.setItem("LastInvoiceNumber", String(nextNumber));
        return String(nextNumber).padStart(3, "0");
    }

    // -------------------------------
    // INVOICE STORAGE
    // -------------------------------
    // 4. Checkout Page: When the user confirms the checkout, generate an invoice. 

    function saveInvoiceToStorage(invoice) {
        let AllInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
        AllInvoices.push(invoice);
        localStorage.setItem("AllInvoices", JSON.stringify(AllInvoices));
        return AllInvoices;
    }


    // -------------------------------
    // INVOICE POPUP DISPLAY
    // -------------------------------
    function showRecentInvoice(invoiceHTML, invoice) {
        const invoiceDisplay = document.getElementById("invoiceDisplay");
        const invoiceGenerated = document.getElementById("invoiceGenerated");

        if (invoiceGenerated) invoiceGenerated.innerHTML = invoiceHTML;
        if (invoiceDisplay) invoiceDisplay.style.display = "flex";

        console.log("Recently created invoice:", invoice);
    }

    // -------------------------------
    // INVOICE GENERATION
    // -------------------------------
    /*Question 5. Invoice Generation:
        a. After checkout, generate an invoice with the following details:
            `Name of company`
            `Date of invoice`
            `Shipping information` (from checkout)
            `Invoice number` (unique)`
            ‘trn’
            `Purchased items` (name, quantity, price, discount)
            `Taxes`
            `Subtotal`
            `Total cost`
        b. Append this invoice to the user’s array of invoices (array of objects). Also store the invoice to localStorage with the key called AllInvoices (as an array of objects) to access later.
        After generating the invoice
        
        c. Optionally, display a message indicating that the invoice has been “sent” to the user’s email.
*/
    function generateAndEmailInvoice(paymentMethodInfo, cartItems, totalCost) {
        const subtotal = totalCost;
        const taxes = calculateTaxes(subtotal);
        const totalWithTax = subtotal + taxes;
        const finalInvoiceNumber = getNextInvoiceNumber();
        const finalTRN = paymentMethodInfo.trn || "UNKNOWN";
        const finalInvoiceDate = new Date().toLocaleString();

        // Build purchased items list
        const purchasedItems = cartItems.map(gameId => {
            const game = games.find(g => g.id === gameId);
            return {
                name: game?.title || "Unknown item",
                quantity: 1,
                price: game?.price || "$0.00",
                discount: "$0.00",
                total: game?.price || "$0.00"
            };
        });


        // Invoice object
        const invoice = {
            invoiceNumber: finalInvoiceNumber,
            trn: finalTRN,
            companyName: "D.E.W Store",
            date: finalInvoiceDate,
            purchasedItems,
            subtotal: `$${subtotal.toFixed(2)}`,
            taxes: `$${taxes.toFixed(2)}`,
            totalCost: `$${totalWithTax.toFixed(2)}`,
            timestamp: new Date().toISOString()
        };

        // Save invoice
        saveInvoiceToStorage(invoice);

        // Build invoice HTML (popup content)
        const invoiceHTML = `
                        <div class="invoice">
                <div class="invoice-header">
                    <h2>D.E.W Store</h2>
                    <h3>TAX INVOICE</h3>
                </div>
                
                <div class="invoice-details">
                    <div class="detail-row">
                        <span class="detail-label">Invoice Number:</span>
                        <span class="detail-value">${finalInvoiceNumber}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">TRN:</span>
                        <span class="detail-value">${finalTRN}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Date of Invoice:</span>
                        <span class="detail-value">${finalInvoiceDate}</span>
                    </div>
                </div>
                
                <table class="invoice-table">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${purchasedItems.map(item => {
            const itemPrice = parseFloat(item.price.replace("$", ""));
            const itemTotal = itemPrice * item.quantity;
            return `
                                <tr>
                                    <td>${item.name}</td>
                                    <td>${item.quantity}</td>
                                    <td>${item.price}</td>
                                    <td>${item.discount}</td>
                                    <td>$${itemTotal.toFixed(2)}</td>
                                </tr>
                            `;
        }).join('')}
                    </tbody>
                </table>
                
                <div class="invoice-totals">
                    <div class="total-row">
                        <span class="total-label">Subtotal:</span>
                        <span class="total-value">$${subtotal.toFixed(2)}</span>
                    </div>
                    <div class="total-row">
                        <span class="total-label">Taxes (15%):</span>
                        <span class="total-value">$${taxes.toFixed(2)}</span>
                    </div>
                    <div class="total-row grand-total">
                        <span class="total-label">Total Cost:</span>
                        <span class="total-value">$${totalWithTax.toFixed(2)}</span>
                    </div>
                </div>
                
                <div class="invoice-footer">
                    <p>Thank you for shopping at D.E.W Store!</p>
                    <p>This is a computer-generated invoice and does not require a signature.</p>
                </div>
            </div>
        `;

        // Show popup
        showRecentInvoice(invoiceHTML, invoice);
        alert("Invoice generated and emailed to you!");

        return invoice;
    }

    // -------------------------------
    // FORM VALIDATION
    // -------------------------------
    function validatePaymentForm() {
        const paymentMethod = document.getElementById("paymentMethodDesktop")?.value || document.getElementById("paymentMethodMobile")?.value;

        if (!paymentMethod || paymentMethod === "" || paymentMethod === "selected") {
            alert("Please select a payment method.");
            return false;
        }

        const requiredFields = {
            creditCard: ["creditCardName", "creditCardNumber", "creditCardExpiration", "creditCardEmail"],
            debitCard: ["debitCardName", "debitCardNumber", "debitCardExpiration", "debitCardEmail"],
            paypal: ["paypalEmail"]
        };

        for (let id of requiredFields[paymentMethod] || []) {
            if (!document.getElementById(id)?.value) {
                alert(`Please fill in all ${paymentMethod} fields.`);
                return false;
            }
        }

        return true;
    }
    // -------------------------------
    // ORDER PROCESSING
    // -------------------------------
    function processOrder() {
        // Prevent placing an order with an empty cart
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // Validate payment form before proceeding
        if (!validatePaymentForm()) return;

        // Confirm with user before placing order
        if (!confirm("Are you sure you want to place the order?")) {
            window.location.href = "games.html";
            return;
        }

        // Collect payment info and calculate total
        const paymentInfo = getPaymentMethodInfo();
        const total = updateTotal();

        // Generate invoice and show popup
        generateAndEmailInvoice(paymentInfo, [...cart], total);

        // Clear cart after successful order
        cart = [];
        saveCart();
        updateTotal();


        // Reset checkout UI
        if (cartContainer) cartContainer.innerHTML = "";
        document.querySelectorAll("input").forEach(input => input.value = "");

        // Reset payment method dropdowns
        const desktopSelect = document.getElementById("paymentMethodDesktop");
        const mobileSelect = document.getElementById("paymentMethodMobile");
        if (desktopSelect) desktopSelect.value = "creditCard";
        if (mobileSelect) mobileSelect.value = "creditCard";
        toggleForm();
    }

    // Attach event listener to "Place Order" button
    const placeOrderButton = document.getElementById("placeOrder");
    if (placeOrderButton) placeOrderButton.addEventListener("click", processOrder);

    // -------------------------------
    // INVOICE POPUP CLOSE HANDLING
    // -------------------------------
    const closeInvoiceBtn = document.getElementById("closeInvoice");
    if (closeInvoiceBtn) {
        closeInvoiceBtn.addEventListener("click", () => {
            const invoiceDisplay = document.getElementById("invoiceDisplay");
            if (invoiceDisplay) {
                invoiceDisplay.style.display = "none";
            }
        });
    }

    // Allow closing popup by clicking outside invoice content
    window.addEventListener("click", (event) => {
        const invoiceDisplay = document.getElementById("invoiceDisplay");
        if (invoiceDisplay && event.target === invoiceDisplay) {
            invoiceDisplay.style.display = "none";
        }
    });
});
