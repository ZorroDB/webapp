import React from 'react';
import { Link } from 'react-router-dom';
import './styling/landing.css';

const WelcomePage = () => {
  return (
    <div className={StyleSheet.}>
      <h1>Clock in/ out application!</h1>
      <p>Please select an option:</p>
      <div className="options">
        <Link to="/login" className="option">
          <button id="login_btn">Log In</button>
        </Link>

        <Link to="/register" className="option">
          <button id="register_btn">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
