import React, { useState } from "react";
import "./styling/login.css";
import axios from "axios";
import { Link } from "react-router-dom";

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    teamCode: "",
  });

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/register",
        formData
      );
      if (response.data.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessages({
          name: "submission",
          message: response.data.message,
        });
      }
    } catch (error) {
      setErrorMessages({
        name: "submission",
        message: "Registration failed. Please try again.",
      });
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  return (
    <div className="registration">
      <div className="header">
        <h1>Register your account</h1>
        <span>Create an account to manage your work hours and more.</span>
      </div>
      <div className="register-form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Full name </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
            />
            {renderErrorMessage("fullName")}
          </div>
          <div className="input-container">
            <label>Email </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Ex. johndoe@gmail.com"
            />
            {renderErrorMessage("email")}
          </div>
          <div className="input-container">
            <label>Password </label>
            <input
              type="password"
              name="pass"
              alue={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
            />
            {renderErrorMessage("password")}
          </div>
          <div className="input-container">
            <label>Role:</label>
            <select
              name="roles"
              size={2}
              required
              onChange={handleInputChange}
              value={formData.role}
            >
              <option value={"employee"}>Employee</option>
              <option value={"employer"}>Employer</option>
            </select>
            {renderErrorMessage("role")}
          </div>
          <div className="input-container">
            <label>Teamcode </label>
            <input
              type="num"
              name="teamCode"
              value={formData.teamCode}
              onChange={handleInputChange}
              required
              placeholder="Ex. 019393"
              maxLength={6}
            />
            {renderErrorMessage("teamCode")}
          </div>
          <div className="button-container sign-up-btn">
            <input type="submit" value="Sign Up" />
          </div>
          {renderErrorMessage("submission")}
          <p id="sign-in">
            Already have an account?
            <Link to={"/login"} className="forgotPwdClass">
              <span id="sign-in-link"> Sign In</span>
            </Link>
          </p>
        </form>
      </div>
      {isSubmitted && <div>Registration successful!</div>}
    </div>
  );
};

export default RegisterScreen;
