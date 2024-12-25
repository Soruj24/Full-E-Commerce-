import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../app/api/apiSlice";

// Define Zod Schema for validation
const schema = z.object({
    email: z.string().email("Invalid email address."),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long.")
        .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
        .regex(/[0-9]/, "Password must include at least one number."),
});


const UserLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmitHandler = async (data) => {
        console.log(data); // Debugging: Ensure form data is correct
        try {
            const res = await login(data).unwrap();
            console.log(res.payload.user)
            dispatch(setCredentials(res.payload));
            navigate("/welcome");
            toast.success("User Login Successfully");
        } catch (error) {
            if (!error?.status) {
                toast.error("No Server Response");
            } else if (error.status === 400) {
                toast.error(error.data?.message || "Missing username and password");
            } else if (error.status === 401) {
                toast.error(error.data?.message || "Unauthorized");
            } else {
                toast.error(error.data?.message || "Login failed. Please try again.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md"
            >
                {/* Email */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                    <input
                        type="email"
                        {...register("email")}
                        placeholder="Enter your email"
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div className="mb-4 relative">
                    <label className="block text-gray-700 font-medium mb-1">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        placeholder="Enter your password"
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition"
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>

                {/* Additional Links */}
                <div className="mt-4 text-center">
                    <p className="text-gray-700">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Register here
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default UserLogin;
