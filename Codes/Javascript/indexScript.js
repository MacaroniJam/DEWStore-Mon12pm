document.addEventListener("DOMContentLoaded", () => {
    // Prevents logged in users from accessing login page using back button and redirects to games page instead
    // Must use logout instead
    const loggedIn = sessionStorage.getItem("loggedIn") === "true";

    if (loggedIn) {
        window.location.replace('games.html');
    }

    // Toggle password visibility
    const passwordInput = document.getElementById("password");
    const eye = document.getElementById("togglePassword");
    const loginForm = document.getElementById("loginForm");
    const cancelButton = document.getElementById("cancelButton");

    eye.addEventListener("click", () => {
        const type = passwordInput.type === "password" ? "text" : "password";
        passwordInput.type = type;
        eye.textContent = type === "password" ? "visibility" : "visibility_off";
    });

    cancelButton.addEventListener("click", () => {
        loginForm.reset();
        passwordInput.type = "password";
        eye.textContent = "visibility";
    });
});

function login(event) {
    event.preventDefault();

    try {
        const loginForm = document.getElementById("loginForm");

        if (!loginForm.checkValidity()) {
            loginForm.reportValidity();
            return false;
        }

        const trn = document.getElementById("trn").value.trim();
        const password = document.getElementById("password").value;
        const registrationData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
        const registeredUser = registrationData.find((record) => record.trn === trn && record.password === password);

        if (!registeredUser) {
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

        sessionStorage.removeItem("loginAttempts");
        SetUsername(registeredUser.trn);
        window.location.href = 'games.html';
        return true;
    } catch (error) {
        alert("Login could not be completed. Please try again.");
        return false;
    }
}
