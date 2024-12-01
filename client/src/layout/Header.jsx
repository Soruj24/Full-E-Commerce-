import { NavLink } from "react-router-dom";

const Header = () => {
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

                {/* Navigation Links */}
                <div className="flex items-center gap-5">
                    <NavLink
                        to="/logout"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-red-600 text-white px-4 py-2 rounded-md shadow"
                                : "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow transition"
                        }
                    >
                        Log out
                    </NavLink>
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
