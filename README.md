# 🕹️ GameHub - Game Shop Web Application

**GameHub** is a full-stack single-page application that lets users browse, wishlist, and purchase video games. It integrates game data from an external API, and provides secure authentication, protected user features, and a seamless e-commerce experience.

---

## 🚀 Live Demo

[🔗 Deployed on Render](https://gamehub-mnpe.onrender.com)  

---

## 📦 Tech Stack

| Frontend           | Backend        | Auth & API             | Database      |
|--------------------|----------------|-------------------------|---------------|
| Vite + React       | Flask (Python) | JWT Authentication      | SQLAlchemy    |
| React Router DOM   | Flask-Restful  | Flask-JWT-Extended      | PostgreSQL    |
| Tailwind CSS       | Marshmallow    | Password Reset via Token| Flask-Migrate |

---

## ✨ Features

- 🔐 User authentication (signup/login/logout)
- 🔁 Password reset via secure token
- 🛍️ Browse games from external API (e.g. RAWG or IGDB)
- 📚 Wishlist and game library (purchased)
- 🛒 Add/remove from cart and checkout
- 📦 Order tracking and order history
- 🧾 Dynamic pricing pulled from external API
- ⚙️ Protected routes and account management


---

## 🧱 Data Models

> Note: All game data is referenced using `api_game_id` from the external API.

### `User`
- `id`, `username`, `email`, `password_hash`, `is_admin`

### `Library`
- `id`, `user_id`, `api_game_id`, `purchased`, `added_at`

### `Order`
- `id`, `user_id`, `total_price`, `status`, `created_at`

### `OrderItem`
- `id`, `order_id`, `api_game_id`, `quantity`, `price_at_purchase`

---

## 🔌 API Endpoints

| Method | Endpoint            | Description                      | Auth Required |
|--------|---------------------|----------------------------------|---------------|
| POST   | `/signup`           | Register new user                | ❌            |
| POST   | `/login`            | User login                       | ❌            |
| POST   | `/reset-password`   | Initiate password reset          | ❌            |
| GET    | `/library`          | Get user's wishlist/purchased    | ✅            |
| POST   | `/library`          | Add game to wishlist/library     | ✅            |
| DELETE | `/library/<id>`     | Remove game from library         | ✅            |
| GET    | `/orders`           | List all past orders             | ✅            |
| POST   | `/orders`           | Create new order (checkout)      | ✅            |
| POST   | `/cart/add`         | Add game to cart                 | ✅            |
| DELETE | `/cart/remove/<id>` | Remove game from cart            | ✅            |

---

## 🧭 Frontend Routes

| Route        | Description                  | Protected |
|--------------|------------------------------|-----------|
| `/`          | Home / Featured games        | ❌        |
| `/shop`      | Browse all games             | ❌        |
| `/games/:id` | Game detail page             | ❌        |
| `/login`     | Login screen                 | ❌        |
| `/signup`    | Signup screen                | ❌        |
| `/reset-password` | Password reset          | ❌        |
| `/cart`      | Shopping cart                | ✅        |
| `/checkout`  | Checkout and payment         | ✅        |
| `/library`   | Wishlist + purchased games   | ✅        |
| `/orders`    | Order history                | ✅        |
| `/profile`   | Edit account settings        | ✅        |

---

# 📜 License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

# 👨‍💻 Author
- [Ian Wafula](https://github.com/Ian-Wafula1)