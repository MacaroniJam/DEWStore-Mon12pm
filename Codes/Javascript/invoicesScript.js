document.addEventListener("DOMContentLoaded", () => {
    // ------------------ Utility Functions ------------------

    // Get all invoices from localStorage
    function showInvoices(searchTRN = "") {
        const allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];

        if (!searchTRN) {
            console.log("All registered invoices:", allInvoices);
            return allInvoices;
        } else {
            const matched = allInvoices.filter(inv => inv.trn === searchTRN);
            console.log(`Invoices for TRN ${searchTRN}:`, matched);
            return matched;
        }
    }

    // Get invoices for a specific TRN (checks registration data too)
    function GetUserInvoices(searchTRN = "") {
        const registrationData = JSON.parse(localStorage.getItem("RegistrationData") || "[]");
        const trn = searchTRN;

        if (!trn) {
            console.log("No TRN provided.");
            return [];
        }

        const userRecord = registrationData.find(user => user.trn === trn);
        if (!userRecord) {
            console.log(`TRN ${trn} was not found in registration data.`);
            return [];
        }

        const allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
        const userInvoices = allInvoices.filter(inv => inv.trn === trn);

        console.log(`Invoices for TRN ${trn}:`, userInvoices);
        return userInvoices;
    }

    // Render invoice list into the page
    function renderInvoiceList(invoices, title = "Invoices") {
        const listContainer = document.getElementById("invoiceListContainer");
        if (!listContainer) return;

        if (!invoices.length) {
            listContainer.innerHTML = `
                <div class="invoice-card">
                    <h3>${title}</h3>
                    <p>No invoices found.</p>
                </div>
            `;
            return;
        }

        listContainer.innerHTML = `
            <div class="invoice-card">
                <h3>${title}</h3>
            </div>
            ${invoices.map(inv => `
                <div class="invoice-card">
                    <h3>Invoice ${inv.invoiceNumber}</h3>
                    <p><strong>TRN:</strong> ${inv.trn}</p>
                    <p><strong>Date:</strong> ${inv.date}</p>
                    <p><strong>Subtotal:</strong> ${inv.subtotal}</p>
                    <p><strong>Taxes:</strong> ${inv.taxes}</p>
                    <p><strong>Total:</strong> ${inv.totalCost}</p>
                    <p><strong>Items:</strong> ${inv.purchasedItems.length}</p>
                </div>
            `).join('')}
        `;
    }

    // Display invoices for a TRN
    function displayUserInvoices(searchTRN = "") {
        const invoices = searchTRN ? GetUserInvoices(searchTRN) : showInvoices();
        const title = searchTRN ? `Invoices for ${searchTRN}` : "All Invoices";
        renderInvoiceList(invoices, title);
        return invoices;
    }

    // ------------------ Event Listeners ------------------

    // View all invoices
    const viewAllBtn = document.getElementById("viewAllInvoices");
    if (viewAllBtn) {
        viewAllBtn.addEventListener("click", () => {
            const allInvoices = showInvoices();
            renderInvoiceList(allInvoices, "All Invoices");
        });
    }

    // Search invoices by TRN
    const searchBtn = document.getElementById("searchInvoices");
    if (searchBtn) {
        searchBtn.addEventListener("click", () => {
            const trn = document.getElementById("searchTRN")?.value.trim();
            displayUserInvoices(trn);
        });
    }
});

