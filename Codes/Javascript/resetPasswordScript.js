document.addEventListener("DOMContentLoaded", () => {
    const newPasswordInput = document.getElementById("newPassword");
    const confirmNewPasswordInput = document.getElementById("confirmNewPassword");
    const toggleNewPassword = document.getElementById("toggleNewPassword");
    const toggleConfirmNewPassword = document.getElementById("toggleConfirmNewPassword");

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

function resetPassword(event) {
    event.preventDefault();

    try {
        const resetPasswordForm = document.getElementById("resetPasswordForm");

        if (!resetPasswordForm.checkValidity()) {
            resetPasswordForm.reportValidity();
            return false;
        }

        const trn = document.getElementById("trn").value.trim();
        const newPassword = document.getElementById("newPassword").value;
        const confirmNewPassword = document.getElementById("confirmNewPassword").value;
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
