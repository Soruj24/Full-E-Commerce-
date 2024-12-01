import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import Home from "../page/Home";
import Register from "../page/auth/Register";
import Login from "../page/auth/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            }
        ]
    },
]);

export default router 