import React from 'react';
import { useGetAllUsersQuery } from '../app/api/apiSlice';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const { data, error, isLoading, isSuccess } = useGetAllUsersQuery({});
  const navigate = useNavigate();

  console.log(data?.payload?.users);

  if (isLoading) {
    return <div className="text-center text-xl  font-semibold">Loading...</div>;
  }

  if (error) {
    toast.error(error?.data?.message);
    navigate("/login");
    return;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-red-400">Users: {data?.payload?.users.length}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isSuccess && data?.payload?.users.map((user) => (
          <div key={user._id} className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
            <p className="text-lg font-semibold text-gray-800">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
