import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import this

function Signup() {
  const navigate = useNavigate(); // ✅ Initialize navigate
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    otp: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Step 1: Send OTP
  const sendOtp = async () => {
    try {
     const res = await fetch(
  `${process.env.REACT_APP_API_URL}/api/users/signup/send-otp`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: form.username,
      email: form.email,
      password: form.password,
    }),
  }
);

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setStep(2);
      } else {
        setMessage(data.message || "Error sending OTP");
      }
    } catch (error) {
      setMessage("Network error");
    }
  };

  // Step 2: Verify OTP
  const verifyOtp = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/signup/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          otp: form.otp,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Signup successful! You can now login.");
        localStorage.setItem("token", data.token);
        // Optional: redirect or reset form
      } else {
        setMessage(data.message || "Invalid OTP");
      }
    } catch (error) {
      setMessage("Network error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Signup - Step 1: Enter Details
            </h2>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendOtp}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Signup - Step 2: Verify OTP
            </h2>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
            >
              Verify OTP
            </button>
          </>
        )}

        {message && (
          <p className="mt-4 text-center text-sm text-red-500">{message}</p>
        )}
      </div>

      {/* 🆕 Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 text-blue-600 hover:underline text-sm"
      >
        ← Back to Home
      </button>
    </div>
  );
}

export default Signup;
