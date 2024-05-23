import React, { useState } from "react";
import "./styling/login.css";
import { Link } from "react-router-dom";

const LoginScreen = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    uname: "",
    pass: "",
  });

  // Mock login validation
  const database = [
    {
      username: "user1",
      password: "pass1",
    },
    {
      username: "user2",
      password: "pass2",
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { uname, pass } = formData;

    // Find user login info
    const userData = database.find((user) => user.username === uname);

    // Compare user info
    if (userData) {
      if (userData.password !== pass) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        // Valid login
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Generate JSX code for error message
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
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
