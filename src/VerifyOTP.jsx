// VerifyOtp.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("emailForOtp");
    if (!email) return alert("Email not found. Please sign up again.");

    try {
      await axios.post(
  `${process.env.REACT_APP_API_URL}/api/users/signup/verify-otp`,
  { email, otp }
);
alert("OTP verified! You can now login.");
navigate("/login");

    } catch (error) {
      alert(error.response?.data?.error || "OTP verification failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleVerify} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>
        <input type="text" placeholder="Enter OTP" value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 mb-4 border rounded" required />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Verify</button>
      </form>
    </div>
  );
}

export default VerifyOtp;
