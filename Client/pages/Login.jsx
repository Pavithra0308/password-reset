import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message); // or store token if needed
        navigate("/login-success"); 
      } 
      else {
        alert("Password Incorrect");
       
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black/50 bg-blend-multiply bg-gradient-to-r from-fuchsia-600 to-pink-600">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 rounded mx-auto w-full max-w-md bg-white">
        <p className="text-center text-2xl font-playfair font-bold text-black">Login</p>

        <label htmlFor="username" className="font-bold font-source text-md">Email</label>
        <input
          id="username"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 font-source"
        />

        <label htmlFor="password" className="font-bold font-source text-md">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 font-source"
        />

        <Link to="/reset-password" className="font-source text-xs hover:underline text-blue-900">
          Forgot Password?
        </Link>

        <div className="flex justify-center">
          <input
            type="submit"
            value="Submit"
            className="font-source font-bold border px-4 py-2 rounded bg-white text-black hover:bg-pink-500 hover:text-white transition duration-300 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}

export default Login;