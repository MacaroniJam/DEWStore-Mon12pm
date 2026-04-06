document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const passwordInput = document.getElementById("password");
    const eye = document.getElementById("togglePassword");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
    const cancelButton = document.getElementById("cancelButton");

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

    cancelButton.addEventListener("click", () => {
        registerForm.reset();
        passwordInput.type = "password";
        confirmPasswordInput.type = "password";
        eye.textContent = "visibility";
        toggleConfirmPassword.textContent = "visibility";
    });
});


function getRegistrationData() {
    const storedRegistrationData = localStorage.getItem("RegistrationData");

    if (!storedRegistrationData) {
        return [];
    }

    const registrationData = JSON.parse(storedRegistrationData);

    if (!Array.isArray(registrationData)) {
        throw new Error("RegistrationData must be an array.");
    }

    return registrationData;
}

function saveRegistrationData(registrationData) {
    localStorage.setItem("RegistrationData", JSON.stringify(registrationData));
}

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

// Form validation to check all required registration rules before allowing form submission
function validateForm(event) {
    event.preventDefault();

    try {
        const form = document.getElementById("registerForm");

        if (!form.checkValidity()) {
            form.reportValidity();
            return false;
        }

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

        const registrationData = getRegistrationData();
        const trnExists = registrationData.some((record) => record.trn === trn);

        if (trnExists) {
            alert("This TRN is already registered. Please use a unique TRN.");
            return false;
        }

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
