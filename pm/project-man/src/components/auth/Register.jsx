import React, { useState } from "react"; // Removed axios import
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // For navigating to another page after successful registration

  const handleRegister = (e) => {
    e.preventDefault();

    // Simulate registration success (you can replace this with real logic later)
    try {
      // Handle successful registration
      setSuccess("Registration successful!");
      setError(""); // Reset any error messages
      setName("");
      setEmail("");
      setPassword("");

      // Store user info in local storage (you can store a success flag or token)
      localStorage.setItem("user", JSON.stringify({ name, email }));

      // Redirect to another page (for example, 'inventory')
      navigate("/inventory"); // Adjust this to the correct route
    } catch (err) {
      // Handle registration error
      console.error("Error registering user:", err);
      setError("An error occurred.");
      setSuccess(""); // Reset success message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Register</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              className="text-blue-600 hover:underline focus:outline-none"
              onClick={() => navigate("/login")} // Redirect to the login page
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
