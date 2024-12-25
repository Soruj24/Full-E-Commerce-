import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import { useLogoutMutation } from "../app/api/apiSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logout] = useLogoutMutation()

    const handelLogout = async () => {
        try {
            dispatch(logOut());
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            await logout().unwrap();

            toast.success("Logout Successfully");

        } catch (error) {
            navigate("/login");
            console.log(error.data.message)
            toast.error(error.data.message);
        }
    };

    return (
        <header className="bg-gray-800 text-white py-4 px-2 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo or Home Link */}
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "text-blue-400 text-2xl font-bold"
                            : "text-white text-2xl font-bold hover:text-gray-300 transition"
                    }
                >
                    Home
                </NavLink>
                
                <NavLink
                    to="/welcome"
                    className={({ isActive }) =>
                        isActive
                            ? "text-blue-400 text-2xl font-bold"
                            : "text-white text-2xl font-bold hover:text-gray-300 transition"
                    }
                >
                    Welcome
                </NavLink>

                {/* Navigation Links */}
                <div className="flex items-center gap-5">
                    <button
                        onClick={handelLogout}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow transition"
                    >
                        Log Out
                    </button>
                    <NavLink
                        to="/register"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-blue-600 text-white px-4 py-2 rounded-md shadow"
                                : "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow transition"
                        }
                    >
                        Register
                    </NavLink>
                </div>
            </div>
        </header>
    );
};

export default Header;
