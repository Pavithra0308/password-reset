import { useState } from "react";
import { useNavigate, useParams } from "react-router";

function ResetPasswordForm() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API}/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword: password }), 
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Password reset successful.");
        navigate("/reset-password/success");
      } else {
        alert(data.message || "Token is invalid or expired.");
      }
    } catch (error) {
      alert("Server error. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-fuchsia-600 to-pink-600">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 rounded bg-white w-full max-w-md shadow-md"
      >
        <h2 className="text-center text-2xl font-bold font-playfair text-black">
          Set New Password
        </h2>

        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 font-source"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 font-source"
        />

        <button
          type="submit"
          className="font-source font-bold border px-4 py-2 rounded bg-white text-black hover:bg-pink-500 hover:text-white transition duration-300 cursor-pointer"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
