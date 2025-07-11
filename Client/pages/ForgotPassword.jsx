import React from "react";
function ForgotPassword() {
  return (
    <div className="flex justify-center items-center h-screen bg-black/50 bg-blend-multiply bg-gradient-to-r from-fuchsia-600 to-pink-600">
      <div className="p-6 rounded bg-white shadow-md w-full max-w-md text-center">
        <p className="text-xl font-bold font-source text-pink-600 mb-2">
          Check your email!
        </p>
        <p className="font-source text-gray-700">
          A password reset link has been sent to your registered email address.
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;