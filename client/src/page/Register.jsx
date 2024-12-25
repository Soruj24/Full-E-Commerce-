import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long."),
    email: z.string().email("Invalid email address."),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long.")
        .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
        .regex(/[0-9]/, "Password must include at least one number.")
        .regex(/[@$!%*?&#]/, "Password must include at least one special character."),
    phone: z.string().regex(/^\d{11}$/, "Phone number must be 11 digits."),
    address: z.string().min(5, "Address must be at least 5 characters long."),
    image: z.any().optional(),
});

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("image", file); // Save the file to form state
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data) => {
        // setIsLoading(true);
        // try {
        //     toast.success("Registration successful!");
        //     navigate('/login')
        // } catch (error) {
        //     console.log(error)
        //     toast.error(error?.data?.message);
        // } finally {
        //     setIsLoading(false); // Stop loading
        // }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md"
            >
                {/* Image Upload (Clickable) */}
                <div className="flex flex-col items-center mb-6">
                    <label
                        htmlFor="image-upload"
                        className="cursor-pointer w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 relative"
                    >
                        <img
                            src={
                                imagePreview || "https://via.placeholder.com/150?text=Upload+Image"
                            }
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                        <input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                    {errors.image && (
                        <p className="text-red-500 text-sm">{errors.image.message}</p>
                    )}
                </div>

                {/* Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Name</label>
                    <input
                        type="text"
                        {...register("name")}
                        placeholder="Enter your name"
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                </div>

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


               

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full ${isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                        } text-white py-2 rounded-lg font-medium transition`}
                    disabled={isLoading}
                >
                    {isLoading ? "Registering..." : "Register"}
                </button>

                {/* Additional Links */}
                <div className="mt-4 text-center">
                    <p className="text-gray-700 font-semibold">
                        Already have an account?
                        <Link to="/login" className="text-blue-500 p-2 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;
