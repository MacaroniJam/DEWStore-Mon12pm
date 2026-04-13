/*     Name            |        ID Number
//------------------------------------------
// Joel Henry          |         2300087
// Stephen Morgan      |         2306623                  
*/
/*Question 6c. GetUserInvoices() – displays all the invoices for a user based on trn stored in the localStorage key called, RegisterData. */
    function GetUserInvoices() {
        const trn = localStorage.getItem("RegisterData");
        const invoice = localStorage.getItem("AllInvoices");
        const userInvoices = invoice ? JSON.parse(invoice).filter(inv => inv.trn === trn) : [];

        const listContainer = document.getElementById("invoiceListContainer");
        if (!listContainer) return;


        listContainer.innerHTML = `
            ${userInvoices.map(inv => `
                <div class="invoice-card">
                    <h3>Invoice ${inv.invoiceNumber}</h3>
                    <p><strong>TRN:</strong> ${inv.trn}</p>
                    <p><strong>Date:</strong> ${inv.date}</p>
                    <p><strong>Subtotal:</strong> ${inv.subtotal}</p>
                    <p><strong>Taxes:</strong> ${inv.taxes}</p>
                    <p><strong>Total:</strong> ${inv.totalCost}</p>
                    <p><strong>Purchased Items:</strong></p>
                    <ul style="margin-top: 5px; margin-bottom: 0; ">
                        ${inv.purchasedItems.map(item => `<li>${item.name} - <span style="font-size: 14px;"><strong>${item.price}</strong></span></li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        `;
    }

document.addEventListener("DOMContentLoaded", GetUserInvoices)

