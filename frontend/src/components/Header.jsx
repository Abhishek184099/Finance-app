import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { authUser, logout } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className='flex justify-between items-center p-4 bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-md'>
      {/* Left Section: App Name */}
      <h1 className='text-2xl font-bold cursor-pointer' onClick={() => navigate('/')}>
        Finance App
      </h1>

      {/* Right Section: User Info and Buttons */}
      <div className='flex items-center space-x-6'>
        {/* Predict Expense Button */}
        <button
          onClick={() => navigate('/regression')}
          className='px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 shadow-sm'
        >
          Predict Expense
        </button>

        {/* User Info and Logout Button */}
        <div className='flex items-center space-x-4'>
          <h1 className='text-lg font-medium'>
            Hello, {authUser.userName}!
          </h1>
          <button
            onClick={logout}
            className='text-white underline hover:text-blue-100 transition duration-300'
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}