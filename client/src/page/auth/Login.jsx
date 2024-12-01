import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiEye, FiEyeOff } from "react-icons/fi";

// Define Zod Schema for validation
const schema = z.object({
    email: z.string().email("Invalid email address."),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long.")
        .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
        .regex(/[0-9]/, "Password must include at least one number."),
    rememberMe: z.boolean(),
});

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data) => {
        console.log("Form Data Submitted:", data);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
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
                        className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        {...register("rememberMe")}
                        className="mr-2"
                    />
                    <label className="text-gray-700">Remember Me</label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition"
                >
                    Login
                </button>

                {/* Additional Links */}
                <div className="mt-4 text-center">
                    <p className="text-gray-700">
                        Don't have an account?{" "}
                        <a href="/register" className="text-blue-500 hover:underline">
                            Register here
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
