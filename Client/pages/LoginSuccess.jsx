import React from 'react';

function LoginSuccess() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-teal-500">
      <div className="p-6 rounded bg-white shadow-md w-full max-w-md text-center">
        <p className="text-2xl font-bold text-green-600 mb-3">🎉 Login Successful</p>
        <p className="text-gray-700">Welcome back! You're now logged in.</p>
      </div>
    </div>
  );
}

export default LoginSuccess;