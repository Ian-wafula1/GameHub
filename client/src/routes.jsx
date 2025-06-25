import App from "./App";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import { Navigate } from "react-router-dom";

const routes = [
    {
        path: "/",
        element: <App />,
        // errorElement: <div>404 Not Found</div>,
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
            // {
            //     path: "*",
            //     element: <Navigate to="/" />
            // }
        ]
    },
];

export default routes;