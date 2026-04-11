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

// Checks the entered TRN and password against RegistrationData.
function login(event) {
    event.preventDefault();

    try {
        const loginForm = document.getElementById("loginForm");

        if (!loginForm.checkValidity()) {
            loginForm.reportValidity();
            return false;
        }

        // Gets the login details entered by the visitor.
        const trn = document.getElementById("trn").value.trim();
        const password = document.getElementById("password").value;
        const registrationData = getRegistrationData();
        const registeredUser = registrationData.find((record) => record.trn === trn && record.password === password);

        if (!registeredUser) {
            // Tracks failed attempts and locks the account page after three tries.
            const attempts = Number(sessionStorage.getItem("loginAttempts")) || 0;
            const updatedAttempts = attempts + 1;
            sessionStorage.setItem("loginAttempts", updatedAttempts);

            if (updatedAttempts >= 3) {
                window.location.href = "accountLocked.html";
                return false;
            }

            alert("Invalid TRN or password. You have " + (3 - updatedAttempts) + " attempt(s) remaining.");
            return false;
        }

        // Uses the person's first and last name in the top corner after login.
        sessionStorage.removeItem("loginAttempts");
        const displayName = [registeredUser.firstName, registeredUser.lastName].filter(Boolean).join(" ") || registeredUser.trn;
        sessionStorage.setItem("currentTRN", registeredUser.trn);
        SetUsername(displayName);
        window.location.href = 'games.html';
        return true;
    } catch (error) {
        alert("Login could not be completed. Please try again.");
        return false;
    }
}
