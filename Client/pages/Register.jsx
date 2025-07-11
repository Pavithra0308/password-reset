import { useNavigate } from "react-router";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    const email = e.target.email.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black/50 bg-blend-multiply bg-gradient-to-r from-fuchsia-600 to-pink-600">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 rounded mx-auto w-full max-w-md bg-white"
      >
        <p className="text-center text-2xl font-playfair font-bold text-black">
          Register
        </p>

        <label htmlFor="username" className="font-bold font-source text-md">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 font-source"
        />
        <label htmlFor="email" className="font-bold font-source text-md">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 font-source"
        />

        <label htmlFor="password" className="font-bold font-source text-md">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 font-source"
        />

        <label
          htmlFor="confirmPassword"
          className="font-bold font-source text-md"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 font-source"
        />

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

export default Register;
