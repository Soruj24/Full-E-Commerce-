import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../page/Home";
import Register from "../page/Register";
import UserLogin from "../page/UserLogin";
import ProtectedRoute from "../Protecte/ProtectedRoute";
import Welcome from "../features/auth/Welcome";
import Users from "../page/Users";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <UserLogin />,
            },
            {
                path: "/welcome",
                element: (
                    // <ProtectedRoute>
                    <Welcome />
                    // </ProtectedRoute>
                ),
            },
            
        ],
    },
]);

export default router;
