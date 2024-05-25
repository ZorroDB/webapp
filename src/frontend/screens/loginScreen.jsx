import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    uname: "",
    pass: "",
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { uname, pass } = formData;
  
    // Client-side validation
    if (!uname || !pass) {
      setErrorMessages({
        name: "submission",
        message: "Please enter both email and password",
      });
      return;
    }
  
    // Request to backend server.
    axios.post("/login", formData)
      .then((response) => {
        console.log("successfully logged in.");
        // Successfull login
        setIsSubmitted(true);
      })
      .catch((error) => {
        // Error during login
        setErrorMessages({
          name: "submission",
          message: "Invalid username or password",
        });
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  return (
    <div className="login-page">
      <div className="header">
        <h1>Log In</h1>
        <span>Enter your email and password to log in to our dashboard</span>
      </div>
      <div className="login-form">
        {isSubmitted ? (
          <div>User is successfully logged in</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Email </label>
              <input
                type="text"
                name="uname"
                placeholder="Please enter your email address..."
                value={formData.uname}
                onChange={handleInputChange}
                required
              />
              {renderErrorMessage("uname")}
            </div>
            <div className="input-container">
              <label>Password </label>
              <input
                type="password"
                name="pass"
                placeholder="Please enter your password..."
                value={formData.pass}
                onChange={handleInputChange}
                required
              />
              {renderErrorMessage("pass")}
              <Link to={"/forgot"} className="forgotPwdClass">
                <span id="forgot_pwd">Forgot password?</span>
              </Link>
            </div>
            <div className="btn-container">
              <div className="button-container">
                <input type="submit" value="Log In" />
              </div>
              <div className="button-container">
                <Link to={"/"} className="forgotPwdClass">
                  <input type="button" value="Return" />
                </Link>
              </div>
            </div>
            {renderErrorMessage("submission")}
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;