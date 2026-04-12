document.addEventListener("DOMContentLoaded", () => {
    const newPasswordInput = document.getElementById("newPassword");
    const confirmNewPasswordInput = document.getElementById("confirmNewPassword");
    const toggleNewPassword = document.getElementById("toggleNewPassword");
    const toggleConfirmNewPassword = document.getElementById("toggleConfirmNewPassword");

    // Toggles password visibility for the reset password form fields.
    toggleNewPassword.addEventListener("click", () => {
        const type = newPasswordInput.type === "password" ? "text" : "password";
        newPasswordInput.type = type;
        toggleNewPassword.textContent = type === "password" ? "visibility" : "visibility_off";
    });

    toggleConfirmNewPassword.addEventListener("click", () => {
        const type = confirmNewPasswordInput.type === "password" ? "text" : "password";
        confirmNewPasswordInput.type = type;
        toggleConfirmNewPassword.textContent = type === "password" ? "visibility" : "visibility_off";
    });
});

/* Question 1a. Login Page
   Reset Password hyperlink used to change the password in RegistrationData
   by matching the visitor's TRN.
*/
function resetPassword(event) {
    event.preventDefault();

    try {
        const resetPasswordForm = document.getElementById("resetPasswordForm");

        if (!resetPasswordForm.checkValidity()) {
            resetPasswordForm.reportValidity();
            return false;
        }

        // Question 1a Reset Password. Get the entered TRN and new password values.
        const trn = document.getElementById("trn").value.trim();
        const newPassword = document.getElementById("newPassword").value;
        const confirmNewPassword = document.getElementById("confirmNewPassword").value;
        // Question 1a Reset Password. Find the record that matches the entered TRN.
        const registrationData = getRegistrationData();
        const registeredUser = registrationData.find((record) => record.trn === trn);

        if (!registeredUser) {
            alert("No account was found for that TRN.");
            return false;
        }

        if (newPassword !== confirmNewPassword) {
            alert("Passwords do not match. Please try again.");
            return false;
        }

        if (newPassword.length < 8) {
            alert("Password must be at least 8 characters long.");
            return false;
        }

        // Question 1a Reset Password. Save the updated password to RegistrationData.
        registeredUser.password = newPassword;
        saveRegistrationData(registrationData);
        sessionStorage.removeItem("loginAttempts");

        alert("Password reset successful. Please log in with your new password.");
        window.location.href = "index.html";
        return true;
    } catch (error) {
        alert("Password reset could not be completed. Please try again.");
        return false;
    }
}
