/*Joel Henry 2300087*/
document.addEventListener("DOMContentLoaded", () => {
    // Prevents logged in users from accessing login page using back button and redirects to games page instead
    // Must use logout instead
    const loggedIn = sessionStorage.getItem("loggedIn") === "true";

    if (loggedIn) {
        window.location.replace('games.html');
    }

    // Toggle password visibility on the login form.
    const passwordInput = document.getElementById("password");
    const eye = document.getElementById("togglePassword");

    eye.addEventListener("click", () => {
        const type = passwordInput.type === "password" ? "text" : "password";
        passwordInput.type = type;
        eye.textContent = type === "password" ? "visibility" : "visibility_off";
    });
});

/* Question 1a. Login Page
   i. Create a login form where visitors can enter their TRN and password.
   ii. Validate the entered TRN and password against RegistrationData.
   iii. Give the visitor three attempts, then redirect to the account locked page.
*/
function login(event) {
    event.preventDefault();

    try {
        const loginForm = document.getElementById("loginForm");

        if (!loginForm.checkValidity()) {
            loginForm.reportValidity();
            return false;
        }

        // Question 1a ii. Get the entered TRN and password from the login form.
        const trn = document.getElementById("trn").value.trim();
        const password = document.getElementById("password").value;
        const registrationData = getRegistrationData();
        const registeredUser = registrationData.find((record) => record.trn === trn);

        if (!registeredUser) {
            sessionStorage.removeItem("loginAttempts");
            alert("No account was found for that TRN. Please register first.");
            return false;
        }

        if (registeredUser.password !== password) {
            // Question 1a iii. Track failed attempts and lock after three tries.
            const attempts = Number(sessionStorage.getItem("loginAttempts")) || 0;
            const updatedAttempts = attempts + 1;
            sessionStorage.setItem("loginAttempts", updatedAttempts);

            if (updatedAttempts >= 3) {
                window.location.href = "accountLocked.html";
                return false;
            }

            alert("Incorrect password. You have " + (3 - updatedAttempts) + " attempt(s) remaining.");
            return false;
        }

        // Question 1a iii. If login is successful, redirect to the product catalog.
        sessionStorage.removeItem("loginAttempts");
        const displayName = [registeredUser.firstName, registeredUser.lastName].filter(Boolean).join(" ") || registeredUser.trn;
        sessionStorage.setItem("currentTRN", registeredUser.trn);
        SetUsername(displayName);
        /*Question 6c. GetUserInvoices() – displays all the invoices for a user based on trn stored in the localStorage key called, RegisterData. */
        localStorage.setItem("RegisterData", registeredUser.trn)
        window.location.href = 'games.html';
        return true;
    } catch (error) {
        alert("Login could not be completed. Please try again.");
        return false;
    }
}
