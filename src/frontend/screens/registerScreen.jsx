import React from "react";
import { Link } from "";

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <h1>Welcome to Our Web Application!</h1>
      <p>Please select an option:</p>
      <div className="options">
        <Link to="/login" className="option">
          Log In
        </Link>
        <Link to="/register" className="option">
          Register
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
