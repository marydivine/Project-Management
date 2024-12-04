// components/FeedbackForm.js
import React, { useState } from "react";
import axios from "axios"; // Import axios
import Sidebar from "../Sidebar"; // Assuming Sidebar is the component that you imported

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    unit: "",
    feedback: "",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send feedback data to the backend
      const response = await axios.post("http://localhost:5000/api/feedback/submit", formData);
      alert(response.data.message); // Show success message from backend
      setFormData({ name: "", unit: "", feedback: "" }); // Reset form
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert("There was an error submitting your feedback.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div
       
      >
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 p-6 bg-white min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "ml-0" : "ml-0 mt-10 md:ml-60"
        }`}
      >
        {/* Toggle button for sidebar in mobile view */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        </button>

        {/* Feedback Form */}
        <div className="bg-white p-6  ml-10 mt-2 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Submit Feedback</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Business Unit</label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select Unit
                </option>
                <option value="Bookshop">Bookshop</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Bottle Water Industry">Bottle Water Industry</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Feedback</label>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your feedback"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
