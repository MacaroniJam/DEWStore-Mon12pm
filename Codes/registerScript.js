document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("password");
    const eye = document.getElementById("togglePassword");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

    //Toggle password visibility for both password and confirm password fields
    eye.addEventListener("click", () => {
        const type = passwordInput.type === "password" ? "text" : "password";
        passwordInput.type = type;
        eye.textContent = type === "password" ? "visibility" : "visibility_off";
    });

    toggleConfirmPassword.addEventListener("click", () => {
        const type = confirmPasswordInput.type === "password" ? "text" : "password";
        confirmPasswordInput.type = type;
        toggleConfirmPassword.textContent = type === "password" ? "visibility" : "visibility_off";
    });
});


// Form validation to check if password and confirm password match before allowing form submission
function validateForm(event) {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return false;
    }
    else {
        window.location.href = 'index.html';
        event.preventDefault();
        return true;
    }
}