import React, { useState } from "react";

export default function PredictionForm({ token }) {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !caption.trim()) {
      setError("Please provide both file and caption.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);

    try {
      const response = await fetch(
  `${process.env.REACT_APP_API_URL}/predict`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // send JWT token
    },
    body: formData,
  }
);


      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Prediction failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Upload Image/Video:</label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Caption:</label>
          <textarea
            className="w-full p-2 border rounded"
            rows={3}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Predicting..." : "Predict Viral"}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-red-600 font-semibold">
          Error: {error}
        </p>
      )}

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h2 className="text-xl font-bold mb-2">Prediction Result</h2>
          <p>
            <strong>Status:</strong> {result.prediction}
          </p>
          <p>
            <strong>Heuristic Score:</strong> {result.heuristic_score}
          </p>
        </div>
      )}
    </div>
  );
}
