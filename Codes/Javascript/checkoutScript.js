document.addEventListener("DOMContentLoaded", () => {
    // Placing all cart items in the checkout page
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
        
        const amountFields = document.querySelectorAll(".amountTotal");
        amountFields.forEach(field => {
            field.value = `$${total.toFixed(2)}`;
        });
        return total;
    }
    
    updateTotal();
    
    function toggleForm() {
        const desktopSelect = document.getElementById("paymentMethodDesktop");
        const mobileSelect = document.getElementById("paymentMethodMobile");

        let paymentMethod = desktopSelect.value;
        if (!paymentMethod || paymentMethod === "" || paymentMethod === "selected") paymentMethod = mobileSelect.value;

        if (desktopSelect.value !== paymentMethod && paymentMethod) desktopSelect.value = paymentMethod;
        if (mobileSelect.value !== paymentMethod && paymentMethod) mobileSelect.value = paymentMethod;

        const creditCardForm = document.getElementById("creditCardForm");
        const debitCardForm = document.getElementById("debitCardForm");
        const paypalForm = document.getElementById("paypalForm");
        
        if (creditCardForm) creditCardForm.style.display = "none";
        if (debitCardForm) debitCardForm.style.display = "none";
        if (paypalForm) paypalForm.style.display = "none";

        if (paymentMethod === "creditCard") {
            if (creditCardForm) creditCardForm.style.display = "block";
        } else if (paymentMethod === "debitCard") {
            if (debitCardForm) debitCardForm.style.display = "block";
        } else if (paymentMethod === "paypal") {
            if (paypalForm) paypalForm.style.display = "block";
        }
    }

    document.getElementById("paymentMethodDesktop").addEventListener("change", toggleForm);
    document.getElementById("paymentMethodMobile").addEventListener("change", toggleForm);
    toggleForm();

    // Get payment method information from the active form
    function getPaymentMethodInfo() {
        const paymentMethod = document.getElementById("paymentMethodDesktop")?.value || document.getElementById("paymentMethodMobile")?.value;
        
        let name = "", number = "", expiration = "", email = "";
        
        if (paymentMethod === "creditCard") {
            name = document.getElementById("creditCardName")?.value || "";
            number = document.getElementById("creditCardNumber")?.value || "";
            expiration = document.getElementById("creditCardExpiration")?.value || "";
            
        } else if (paymentMethod === "debitCard") {
            name = document.getElementById("debitCardName")?.value || "";
            number = document.getElementById("debitCardNumber")?.value || "";
            expiration = document.getElementById("debitCardExpiration")?.value || "";
           
        } else if (paymentMethod === "paypal") {
            email = document.getElementById("paypalEmail")?.value || "";
           
        }
        
        return { name, number, expiration, email, trn};
    }

    // Calculate taxes (assume 15% tax rate)
    function calculateTaxes(subtotal) {
        const taxRate = 0.15;
        return subtotal * taxRate;
    }

    // Generate unique invoice number if not provided
    function generateInvoiceNumber() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000);
        return `INV-${timestamp}-${random}`;
    }


    // Save invoice to localStorage
    function saveInvoiceToStorage(invoice) {
        let allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
        allInvoices.push(invoice);
        localStorage.setItem("AllInvoices", JSON.stringify(allInvoices));
        console.log("Invoice saved to localStorage:", invoice);
        return allInvoices;
    }
    /* This is to find and retrieve the invoice from localStorage using user's input of their TRN
    function findInvoiceByTRN(trn) {
        const allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
        return allInvoices.find(inv => inv.trn === trn);
    }
    */

    // Simple alert for email sent
    function showEmailSentMessage(email, invoiceNumber) {
        // Use mailto link to open user's email client with pre-filled email
        window.location.href = `mailto:${email}?subject=Your Invoice from D.E.W Store&body=Thank you for your purchase! Your invoice number is ${invoiceNumber}. If you have any questions, please contact our support team.`;

        // Also show a console log for debugging
        console.log(`Email sent to: ${email} with Invoice #${invoiceNumber}`);
    }

    // Generate and email invoice
    function generateAndEmailInvoice(paymentMethodInfo, cartItems, totalCost) {
        const subtotal = totalCost;
        const taxes = calculateTaxes(subtotal);
        const totalWithTax = subtotal + taxes;
        const registrationData = getRegistrationData(); // From mainScript.js

        
        // Use provided invoice number/TRN or generate new ones
        const finalInvoiceNumber =  generateInvoiceNumber();
        const finalTRN = registrationData.trn
        const finalInvoiceDate = paymentMethodInfo.invoiceDate || new Date().toLocaleString();
        
        const purchasedItems = cartItems.map(gameId => {
            const game = games.find(g => g.id === gameId);
            return {
                name: game.title,
                quantity: 1,
                price: game.price,
                discount: "$0.00",
                total: game.price
            };
        });
        
        // Create invoice object
        const invoice = {
            invoiceNumber: finalInvoiceNumber,
            trn: finalTRN,
            companyName: "D.E.W Store",
            date: finalInvoiceDate,
           
            purchasedItems: purchasedItems,
            subtotal: `$${subtotal.toFixed(2)}`,
            taxes: `$${taxes.toFixed(2)}`,
            totalCost: `$${totalWithTax.toFixed(2)}`,
            timestamp: new Date().toISOString()
        };
        
        // Save to localStorage
        saveInvoiceToStorage(invoice);
        
        // Create the invoice HTML for display
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
        
        // Display invoice
        const invoiceDisplay = document.getElementById("invoiceDisplay");
        const invoiceGenerated = document.getElementById("invoiceGenerated");
        
        if (invoiceGenerated) {
            invoiceGenerated.innerHTML = invoiceHTML;
        }
        
        if (invoiceDisplay) {
            invoiceDisplay.style.display = "flex";
        }
        
        // Show email sent message (using alert for reliability)
        showEmailSentMessage(paymentMethodInfo.email, finalInvoiceNumber);
        
        return invoice;
    }

    // Validate form fields
    function validatePaymentForm(event) {
        const paymentMethod = document.getElementById("paymentMethodDesktop")?.value || document.getElementById("paymentMethodMobile")?.value;
        
        if (!paymentMethod || paymentMethod === "" || paymentMethod === "selected") {
            alert("Please select a payment method.");
            return false;
        }
        
        if (paymentMethod === "creditCard") {
            const required = ["creditCardName", "creditCardNumber", "creditCardExpiration"];
            for (let id of required) {
                if (!document.getElementById(id)?.value) {
                    alert("Please fill in all credit card fields.");
                    return false;
                }
            }
        } else if (paymentMethod === "debitCard") {
            const required = ["debitCardName", "debitCardNumber", "debitCardExpiration"];
            for (let id of required) {
                if (!document.getElementById(id)?.value) {
                    alert("Please fill in all debit card fields.");
                    return false;
                }
            }
        } else if (paymentMethod === "paypal") {
            const required = [ "paypalEmail"];
            for (let id of required) {
                if (!document.getElementById(id)?.value) {
                    alert("Please fill in all PayPal fields.");
                    return false;
                }
            }
        }
        
        return true;
    }

    const placeOrderButton = document.getElementById("placeOrder");
    if (placeOrderButton) {
        placeOrderButton.addEventListener("click", processOrder);
    }

    
    updateTotal();

    // Process order and generate invoice
    function processOrder() {
        
        
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        
        if (!validatePaymentForm()) {
            return;
        }
        
        if (!confirm("Are you sure you want to place the order?")) {
            const paymentInfo = getPaymentMethodInfo();
            const total = updateTotal();

            // Generate and display invoice
            generateAndEmailInvoice(paymentInfo, [...cart], total);

            // Clear cart after successful order
            cart = [];
            if (typeof saveCart === 'function') {
                saveCart();
            }

            // Reset UI
            if (cartContainer) cartContainer.innerHTML = "";
            const allInputs = document.querySelectorAll("input");
            allInputs.forEach(input => input.value = "");
            return;
        }
        
       
    }
    const paymentInfo = getPaymentMethodInfo();
    const total = updateTotal();
        
    // Generate and display invoice (also saves to localStorage)
    generateAndEmailInvoice(paymentInfo, [...cart], total);
        
   
    function showUserFrequency(){

    }
        
    // Reset forms
    const desktopSelect = document.getElementById("paymentMethodDesktop");
    const mobileSelect = document.getElementById("paymentMethodMobile");
    if (desktopSelect) desktopSelect.value = "creditCard";
    if (mobileSelect) mobileSelect.value = "creditCard";
    toggleForm();
        
    if (cartContainer) cartContainer.innerHTML = "";
        
    // Clear form fields
    const allInputs = document.querySelectorAll("input");
    allInputs.forEach(input => {
        input.value = "";
    });

    // Clear cart
    cart = [];
    if (typeof saveCart === 'function') {
        saveCart();
    }

    // Cancel button function
    function goBackToCart() {
        window.location.href = "cart.html";
    }

    // Event listeners for buttons and invoice
   
    
    /*const cancelButton = document.getElementById("cancelCheckout");
    if (cancelButton) {
        cancelButton.addEventListener("click", goBackToCart);
    }
    

    const closeInvoiceBtn = document.getElementById("closeInvoice");
    if (closeInvoiceBtn) {
        closeInvoiceBtn.addEventListener("click", () => {
            const invoiceDisplay = document.getElementById("invoiceDisplay");
            if (invoiceDisplay) {
                invoiceDisplay.style.display = "none";
            }
        });
    }*/
    
    window.addEventListener("click", (event) => {
        const invoiceDisplay = document.getElementById("invoiceDisplay");
        if (invoiceDisplay && event.target === invoiceDisplay) {
            invoiceDisplay.style.display = "none";
        }
    });
});