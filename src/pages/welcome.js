import React, { useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-xl"
      >
        <Card className="text-white shadow-2xl rounded-2xl bg-opacity-90 bg-gray-900 p-6">
          <CardContent className="text-center space-y-6">
            <h1 className="text-4xl font-bold">Welcome to Viral Meter</h1>
            <p className="text-lg">
              Upload your Instagram Reels and let AI tell you if it'll go viral.
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <Button
                onClick={() => navigate("/signup")}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Sign Up
              </Button>
              <Button
                onClick={() => navigate("/login")}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Log In
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default Welcome;
