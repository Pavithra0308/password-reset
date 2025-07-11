import { useState } from "react";
import { useNavigate } from "react-router";

function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Reset link sent successfully.");
        navigate("/login");
      } else {
        alert(data.message || "Reset link request failed.");
      }
    } catch (error) {
      alert("Server error. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-fuchsia-600 to-pink-600">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 rounded bg-white w-full max-w-md shadow-md">
        <p className="text-center text-2xl font-bold font-playfair text-black">Reset Password</p>

        <label htmlFor="email" className="font-bold font-source text-md">Registered Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 font-source"
        />

        <input
          type="submit"
          value="Send Reset Link"
          className="font-source font-bold border px-4 py-2 rounded bg-white text-black hover:bg-pink-500 hover:text-white transition duration-300 cursor-pointer"
        />
      </form>
    </div>
  );
}

export default ResetPassword;