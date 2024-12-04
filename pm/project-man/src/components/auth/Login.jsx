import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for page redirection

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For navigating to another page after login

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate successful login (you can add more logic to validate email and password)
    if (email === "marydivinee@gmail.com" && password === "12345678") {
      // Store user data or token in localStorage
      localStorage.setItem("token", "dummy_token"); // Simulate storing a token

      // Call the onLogin callback to pass role or other user info (if needed)
      // onLogin(); // You can extend this to pass more details like user role

      // Redirect to the 'dashboard' page (or another page after successful login)
      navigate("/inventory"); // Adjust this to the correct route
      setError(""); // Reset error if login is successful
    } else {
      // Handle login error
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              className="text-blue-600 hover:underline focus:outline-none"
              onClick={() => navigate("/register")} // Redirect to the register (sign-up) page
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
