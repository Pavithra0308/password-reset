import React from 'react';
import { useNavigate } from 'react-router';

function ResetPassword_success() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black/50 bg-blend-multiply bg-gradient-to-r from-fuchsia-600 to-pink-600">
      <div className="p-6 rounded bg-white shadow-md w-full max-w-md text-center">
        <p className="text-2xl font-bold font-source text-pink-600 mb-3">
          ✅ Password Reset Successful
        </p>
        <p className="font-source text-gray-700 mb-4">
          Your new password has been updated. You're all set to log in and continue securely.
        </p>
        <p className="font-source text-gray-700 mb-6">
          For security reasons, make sure your password is stored safely and avoid sharing it with anyone.
        </p>
        <button
          onClick={handleLogin}
          className="font-source font-bold px-5 py-2 rounded bg-pink-500 text-white hover:bg-pink-600 transition duration-300"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}

export default ResetPassword_success;