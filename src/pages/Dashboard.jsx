import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Dashboard() {
  const [video, setVideo] = useState(null);
  const [caption, setCaption] = useState("");
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!video) return alert("Please upload a video!");

    const formData = new FormData();
    formData.append("file", video); // Must match backend field
    formData.append("caption", caption);

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post("http://localhost:5000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setPrediction(res.data.prediction || "No prediction returned.");
    } catch (error) {
      console.error("Prediction failed:", error);
      setPrediction("Failed to predict. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          🎯 Viral Meter Dashboard
        </h1>

        <form onSubmit={handleUpload} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              📄 Caption (optional):
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Enter your caption here..."
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              📹 Upload Reel (MP4):
            </label>
            <input
              type="file"
              accept="video/mp4"
              onChange={(e) => setVideo(e.target.files[0])}
              className="w-full px-4 py-2 border rounded-lg shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            {loading ? "🔄 Predicting..." : "🚀 Predict"}
          </button>
        </form>

        {prediction && (
          <div className="mt-6 bg-gray-100 border border-gray-300 p-4 rounded-lg text-center shadow-sm">
            <strong className="text-gray-700">📊 Result:</strong>{" "}
            <span className="text-gray-900">{prediction}</span>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={handleLogout}
            className="text-red-500 font-medium hover:underline"
          >
            🚪 Log out
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;
