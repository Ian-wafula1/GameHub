import App from "./App";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import { Navigate } from "react-router-dom";
import Store from "./pages/Store";
import Game from "./pages/Game";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <div>404 Not Found</div>,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/reset-password",
                element: <ResetPassword />
            },
            {
                path: "/store",
                element: <Store />
            },
            {
                path: "/game/:id",
                element: <Game />
            },
            {
                path: "/checkout",
                element: <Checkout />
            },
            {
                path: "/orders",
                element: <Orders />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "*",
                element: <Navigate to="/" />
            }
        ]
    },
];

export default routes;