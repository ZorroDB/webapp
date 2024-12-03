import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/90 to-primary flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6 transform transition-all">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to TimeTracker
          </h1>
          <p className="text-gray-600">
            Your simple solution for time management
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Buttons Section */}
        <div className="space-y-4">
          <Link to="/login" className="block">
            <button
              id="login_btn"
              className="w-full bg-primary text-white py-3 px-4 rounded-xl font-medium hover:bg-primary/90 transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md"
            >
              Sign In
            </button>
          </Link>

          <Link to="/register" className="block">
            <button
              id="register_btn"
              className="w-full bg-white text-primary py-3 px-4 rounded-xl font-medium border-2 border-primary hover:bg-primary/5 transform transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Create Account
            </button>
          </Link>
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-gray-500">
          Track your work hours efficiently and professionally
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
