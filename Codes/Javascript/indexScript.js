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
    eye.addEventListener("click", () => {
        const type = passwordInput.type === "password" ? "text" : "password";
        passwordInput.type = type;
        eye.textContent = type === "password" ? "visibility" : "visibility_off";
    });
});

function login(event) {
    event.preventDefault();
    SetUsername(document.getElementById("username").value);
    window.location.href = 'games.html';
}