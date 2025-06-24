if (!localStorage.getItem('loggedInUser')) {
    alert('Please log in to access the store.');
    window.location.href = 'login.html';
}
const games = [
    { id: 1, name: "Game One", image: "https://via.placeholder.com/200", price: 30 },
    { id: 2, name: "Game Two", image: "https://via.placeholder.com/200", price: 40 },
    { id: 3, name: "Game Three", image: "https://via.placeholder.com/200", price: 50 }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function showHome() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '<h2>Available Games</h2><div class="games-list" id="games-list"></div>';

    const gamesList = document.getElementById('games-list');
    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <img src="${game.image}" alt="${game.name}" />
            <h3>${game.name}</h3>
            <p>Price: $${game.price}</p>
            <button onclick="addToCart(${game.id})">Add to Cart</button>
        `;
        gamesList.appendChild(gameCard);
    });
}
function addToCart(gameId) {
    const game = games.find(g => g.id === gameId);
    cart.push(game);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('${game.name} added to cart!');
}
function showCart() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '<h2>Your Cart</h2>';
    if (cart.length === 0) {
        mainContent.innerHTML += '<p>Your cart is empty.</p>';
        return;
    }

    let total = 0;

    cart.forEach(game => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = <p>${game.name} - $${game.price}</p>;
        mainContent.appendChild(cartItem);
        total += game.price;
    });

    mainContent.innerHTML += <h3>Total: $${total}</h3>;
}
showHome();