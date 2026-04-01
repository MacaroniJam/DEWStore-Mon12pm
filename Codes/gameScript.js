document.addEventListener("DOMContentLoaded", () => {
    // Get game ID from URL and display game details
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get("id");
    const cartButton = document.getElementById("CartButton");

    if (!gameId) return;

    const selectedGame = games.find(g => g.id === gameId);
    if (!selectedGame) return;

    // Fill elements with game data selected on games page 
    // Fill image
    document.querySelector(".game-details img").src = selectedGame.fullImage;

    // Fill description
    document.getElementById("gameDescription").textContent = selectedGame.description;

    // Fill title
    document.getElementById("gameTitleDesktop").textContent = selectedGame.title;
    document.getElementById("gameTitleMobile").textContent = selectedGame.title;

    // Fill genres
    const genreElementsDesktop = ["genre1Desktop", "genre2Desktop", "genre3Desktop"];
    const genreElementsMobile = ["genre1Mobile", "genre2Mobile", "genre3Mobile"];
    selectedGame.genres.forEach((genre, index) => {
        if (genreElementsDesktop[index]) {
            document.getElementById(genreElementsDesktop[index]).textContent = genre;
        }
        if (genreElementsMobile[index]) {
            document.getElementById(genreElementsMobile[index]).textContent = genre;
        }
    });

    // Fill price
    document.getElementById("gamePrice").textContent = selectedGame.price;

    // If game is not in cart, add it, otherwise remove it
    if (isInCart(gameId)) {
        cartButton.textContent = "Remove from Cart";
    } else {
        cartButton.textContent = "Add to Cart";
    }

    cartButton.addEventListener("click", () => {
        if (!loggedIn) {
            window.location.href = "index.html";
            return;
        }

        if (isInCart(gameId)) {
            removeFromCart(gameId);
            cartButton.textContent = "Add to Cart";
        } else {
            addToCart(gameId);
            cartButton.textContent = "Remove from Cart";
        }
    });
});