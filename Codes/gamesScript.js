document.addEventListener("DOMContentLoaded", () => {
    const gameSlide = document.getElementById("GameSlide");
    const logo = document.getElementById("logo");
    const overlayText = document.querySelector(".OverlayContent p");
    const radioButtons = document.querySelectorAll('.image-selector input[type="radio"]');
    const playButton = document.getElementById("playButton");

    // Get last slide index from sessionStorage, default to 0
    let currentIndex = Number(sessionStorage.getItem("currentSlide")) || 0;

    // Set initial slide
    gameSlide.src = slides[currentIndex].image;
    logo.src = slides[currentIndex].logo;
    overlayText.textContent = slides[currentIndex].text;
    radioButtons[currentIndex].checked = true; // update radio button

    // Radio buttons
    radioButtons.forEach((radio, index) => {
        radio.addEventListener("change", () => {
            currentIndex = index;

            // Save current index to sessionStorage
            sessionStorage.setItem("currentSlide", currentIndex);

            gameSlide.style.opacity = 0;
            setTimeout(() => {
                gameSlide.src = slides[index].image;
                logo.src = slides[index].logo;
                overlayText.textContent = slides[index].text;
                gameSlide.style.opacity = 1;
            }, 500);
        });
    });

    // Redirect to game page with selected promotional game when play button is clicked
    playButton.addEventListener("click", () => {
        // Adds the id of the currently selected promotional game to the URL as a query parameter and redirects to the game page
        window.location.href = `game.html?id=${slides[currentIndex].id}`;
    });

    // Create game cards with games database
    const gamesGrid = document.querySelector(".games-grid");
    games.forEach(game => {
        const card = document.createElement("div");
        card.classList.add("game-card");

        card.innerHTML = `
            <img src="${game.image}" alt="${game.title}">
            <div class="card-content">
                <h3>${game.title}</h3>
                <p>${game.price}</p>
            </div>
        `;

        card.addEventListener("click", () => {
            // Adds the id of the currently selected promotional game to the URL as a query parameter and redirects to the game page
            window.location.href = `game.html?id=${game.id}`;
        });

        gamesGrid.appendChild(card);
    });
});