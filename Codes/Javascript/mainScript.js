// saving username and login status in session storage for use across pages, will be cleared when browser is closed
var username = sessionStorage.getItem("username") || "";
var loggedIn = sessionStorage.getItem("loggedIn") === "true";

let usernameDiv = null;

/* Question 1. User Authentication (LocalStorage)
   Shared RegistrationData functions used by registration, login, and reset password.
*/
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

// Saves the updated RegistrationData array back to localStorage.
function saveRegistrationData(registrationData) {
    localStorage.setItem("RegistrationData", JSON.stringify(registrationData));
}

// Header and nav elements for dynamic updates based on login status
const header = document.querySelector('header');
const navLinks = document.getElementById('nav-links');
const usernameDisplay = document.getElementById('usernameDisplay');

/*Question 2ei. Shopping Cart (localStorage and Objects)*/
// Cart stored in local storage to persist after website is closed
var cart = JSON.parse(localStorage.getItem("cart")) || [];



/*Question 2a.: Product List (Using Arrays & Objects)
    Create an array of product objects in JavaScript. Each product should have:
        i. `name`
        ii. `price`
        iii. `description`
        iv. `image`
*/
// List of games shown in games page
const games =[
    {
        id: "COE33",
        image: "../Assets/Images/COE33Cover.png",
        title: "Clair Obscur: Expedition 33",
        price: "$59.99",
        fullImage: "../Assets/Images/COE33FullImage.jpg",
        description: "Lead the members of Expedition 33 on their quest to destroy the Paintress so that she can never paint death again. Explore a world of wonders inspired by Belle Époque France and battle unique enemies in this turn-based RPG with real-time mechanics.",
        genres: ["TBRPG", "Adventure", "Fantasy"]
    },

    {
        id: "MHWilds",
        image: "../Assets/Images/MHWCover.png",
        title: "Monster Hunter Wilds",
        price: "$49.99",
        fullImage: "../Assets/Images/MHWFullImage.jpg",
        description: "The unbridled force of nature runs wild and relentless, with environments transforming drastically from one moment to the next. This is a story of monsters and humans and their struggles to live in harmony in a world of duality.",
        genres: ["Action", "Online Co-op", "Adventure"]

    },

    {
        id: "RE9",
        image: "../Assets/Images/RE9Cover.jpg",
        title: "Resident Evil: Requiem",
        price: "$69.99",
        fullImage: "../Assets/Images/RE9FullImage.jpg",
        description: "Requiem for the dead. Nightmare for the living. Prepare to escape death in a heart-stopping experience that will chill you to your core.",
        genres: ["Survival Horror", "Action", "TPS"]

    },

    {
        id: "GTAV",
        image: "../Assets/Images/GTAVCover.jpg",
        title: "Grand Theft Auto V",
        price: "$29.99",
        fullImage: "../Assets/Images/GTAVFullImage.png",
        description: "Experience entertainment blockbusters Grand Theft Auto V and Grand Theft Auto Online — now upgraded for a new generation with stunning visuals, faster loading, 3D audio, and more, plus exclusive content for GTA Online players.",
        genres: ["Action", "Open World", "Crime"]
    },

    {
        id: "LOP",
        image: "../Assets/Images/LOPCover.png",
        title: "Lies of P",
        price: "$39.99",
        fullImage: "../Assets/Images/LOPFullImage.jpg",
        description: "Lies of P is a thrilling soulslike that takes the story of Pinocchio, turns it on its head, and sets it against the darkly elegant backdrop of the Belle Epoque era.",
        genres: ["Action RPG", "Souls-like", "Dark Fantasy"]
    }
    

];


/*Question 2b. An updated product list must be kept on localStorage, as AllProducts.*/
var AllProducts = localStorage.getItem("AllProducts") ? JSON.parse(localStorage.getItem("AllProducts")) : games;
// Save games list to local storage
localStorage.setItem("AllProducts", JSON.stringify(games));

/*Question 2c. Display the product list dynamically on the website.*/
function updateGames()
{
    if (AllProducts.length !== games.length) {
        games = gamesList;
        localStorage.setItem("AllProducts", JSON.stringify(games));
    }
}


// Call updateGames on page load to ensure games are in local storage
document.addEventListener("DOMContentLoaded", updateGames);


// Promotional slides for homepage
const slides = [
    {
        id: games[0].id,
        logo: "../Assets/Images/COE33Logo.png",
        image: "../Assets/Images/COE33Promo.jpg",
        text: "The ground-breaking turn-based RPG, 2025 Game of the Year winner!"
    },
    {
        id: games[1].id,
        logo: "../Assets/Images/MHWLogo.png",
        image: "../Assets/Images/MHWPromo.png",
        text: "Fight Omega Planetes in the new Monster Hunter Wilds x Final Fantasy XIV collaboartion event!"
    },
    {
        id: games[2].id,
        logo: "../Assets/Images/RE9Logo.png",
        image: "../Assets/Images/RE9Promo.jpg",
        text: "The long awaited sequel to the Resident Evil franchise, Resident Evil: Requiem, out now!"
    }
]; 


// Navbar update function based on login staus
function updateNav() {
    if (loggedIn) {
        navLinks.innerHTML = `
            <a href="games.html">Games</a>
            <a href="cart.html">Cart</a>
            <a href="checkout.html">Checkout</a>
            <a href="invoices.html">Invoices</a>
            <a href="aboutus.html">About Us</a>
            <a href="#" id="logout">Logout</a>
        `;
        navLinks.style.marginLeft = "20px";

        if (!usernameDiv) {
            usernameDiv = document.createElement("h3");
            usernameDiv.style.marginLeft = "auto";
            usernameDiv.style.paddingRight = "20px";
            usernameDiv.textContent = username;
            header.appendChild(usernameDiv);
        } else {
            usernameDiv.textContent = username;
        }

        const logoutBtn = document.getElementById("logout");
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();

            
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("loggedIn");
            sessionStorage.removeItem("currentTRN");

            loggedIn = false;
            username = null;

            window.location.replace("index.html");
        });

    } else {
        navLinks.innerHTML = `
            <a href="index.html">Login</a>
            <a href="register.html">Register</a>
            <a href="games.html">Games</a>
            <a href="aboutus.html">About Us</a>
        `;
        navLinks.style.marginLeft = "auto";

        if (usernameDiv) {
            usernameDiv.remove();
            usernameDiv = null;
        }
    }
}

function SetUsername(name) {
    /* Question 1a. Login Page
       Shows the logged-in user's first and last name in the top corner.
    */
    username = name;
    sessionStorage.setItem("username", name);
    sessionStorage.setItem("loggedIn", "true");
    updateNav();
}

// Call updateNav on page load
document.addEventListener('DOMContentLoaded', updateNav);


/*Question 2ei. Shopping Cart (localStorage and Objects)*/
// Cart management functions
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Update cart count in navbar
function updateCartCount() {
    let cartCountEl = document.getElementById("cart-count");

    // Create the element if it doesn't exist
    if (!cartCountEl) {
        const cartLink = document.querySelector('#nav-links a[href="cart.html"]');
        if (!cartLink) return; // navbar not ready yet
        cartCountEl = document.createElement("span");
        cartCountEl.id = "cart-count";
        cartCountEl.style.cssText = `
            background-color: rgb(5, 122, 240);
            color: white;
            font-size: 12px;
            padding: 2px 6px;
            border-radius: 50%;
            margin-left: 5px;
        `;
        cartLink.appendChild(cartCountEl);
    }

    // Update count or hide if zero
    if (cart.length > 0) {
        cartCountEl.textContent = cart.length;
        cartCountEl.style.display = "inline-block";
    } else {
        cartCountEl.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', updateCartCount);

function isInCart(gameId) {
    return cart.includes(gameId);
}

/*Question 2ei1. When a user clicks the “Add to Cart” button, add the selected product to the user’s shopping cart. */
function addToCart(gameId) {
    cart.push(gameId);
    saveCart();
}

function removeFromCart(gameId) {
    cart = cart.filter(id => id !== gameId);
    saveCart();
}





