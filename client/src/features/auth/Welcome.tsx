import React from 'react';
import { selectCurrentToken, selectCurrentUser } from './authSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useProtectedRouteQuery } from '../../app/api/apiSlice';

const Welcome = () => {
    const token = useSelector(selectCurrentToken);
    const user = useSelector(selectCurrentUser);
    const { data, error, isLoading } = useProtectedRouteQuery();

    console.log("data", data?.payload?.user);  

    if (isLoading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error?.data?.message || "Something went wrong!"}</p>;
    }

    // Check if 'data.payload.user' is an array before using map
    const renderUsers = Array.isArray(data?.payload?.user) ? (
        data.payload.user.map((user, index) => (
            <div key={index} className="p-4 border-b border-gray-300 flex flex-col space-y-2">
                <p className="text-lg font-semibold">User Name: <span className="text-gray-700">{user.name}</span></p>
                <p className="text-sm text-gray-500">User Email: <span className="text-gray-600">{user.email}</span></p>
            </div>
        ))
    ) : (
        <p className="text-center text-gray-600">No users found.</p> // Fallback message if it's not an array
    );

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">{user ? `Welcome, ${user.name}` : 'Welcome, Guest'}</h2>
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <p className="text-lg font-medium text-gray-700">Your Token:</p>
                    {token ? (
                        <p className="text-sm text-gray-500">{token.slice(0, 20)}...</p>
                    ) : (
                        <p className="text-sm text-gray-500">No token available.</p>
                    )}
                </div>
                <div>
                    {renderUsers}
                </div>

            </div>
        </div>
    );
};

export default Welcome;
