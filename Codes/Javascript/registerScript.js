document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("password");
    const eye = document.getElementById("togglePassword");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

    // Toggles password visibility for the registration form fields.
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


// Calculates age from the selected date of birth.
function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

// Validates the registration form and saves a new record to RegistrationData.
function validateForm(event) {
    event.preventDefault();

    try {
        const form = document.getElementById("registerForm");

        if (!form.checkValidity()) {
            form.reportValidity();
            return false;
        }

        // Gets all values entered in the registration form.
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const dateOfBirth = document.getElementById("dateOfBirth").value;
        const gender = document.getElementById("gender").value;
        const phoneNumber = document.getElementById("phoneNumber").value.trim();
        const email = document.getElementById("email").value.trim();
        const trn = document.getElementById("trn").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const trnFormat = /^\d{3}-\d{3}-\d{3}$/;

        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return false;
        }

        if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return false;
        }

        if (calculateAge(dateOfBirth) < 18) {
            alert("You must be over 18 years old to register.");
            return false;
        }

        if (!trnFormat.test(trn)) {
            alert("TRN must be 11 characters and use the format 000-000-000.");
            return false;
        }

        // Checks that the TRN is not already in use.
        const registrationData = getRegistrationData();
        const trnExists = registrationData.some((record) => record.trn === trn);

        if (trnExists) {
            alert("This TRN is already registered. Please use a unique TRN.");
            return false;
        }

        // Creates the new registration object to store.
        const registrationRecord = {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            gender: gender,
            phoneNumber: phoneNumber,
            email: email,
            trn: trn,
            password: password,
            dateOfRegistration: new Date().toISOString(),
            cart: {},
            invoices: []
        };

        // Adds the new record to the saved registration list.
        registrationData.push(registrationRecord);
        saveRegistrationData(registrationData);

        alert("Registration successful. Please log in with your TRN.");
        window.location.href = "index.html";
        return true;
    } catch (error) {
        alert("Registration could not be completed. Please check your information and try again.");
        return false;
    }
}
