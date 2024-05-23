import React, { useState } from "react";
import "./styling/login.css";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../backend/services/api";

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    teamCode: "",
  });

  const [error, setError] = useState("");
  const history = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/register", formData);
      setSuccess(true);
      setError(null);
    } catch (err) {
      setError(err.response.data.message);
      setSuccess(false);
    }
  };

  return (
    <div className="register-page">
      <div className="header">
        <h1>Register your account</h1>
        <span>Create an account to manage your work hours and more.</span>
        {error && <div className="error">{error}</div>}
      </div>
      <div className="register-form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Full name </label>
            <input
              type="text"
              name="fullName"
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          <div className="input-container">
            <label>Email </label>
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              required
              placeholder="Ex. johndoe@gmail.com"
            />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input
              type="password"
              name="pass"
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
            />
          </div>
          <div className="input-container">
            <label>Confirm Password </label>
            <input
              type="password"
              name="pass"
              onChange={handleInputChange}
              required
              placeholder="Confirm your password"
            />
          </div>
          <div className="input-container">
            <label>Role:</label>
            <select name="roles" size={2} required onChange={handleInputChange}>
              <option value={"employee"}>Employee</option>
              <option value={"employer"}>Employer</option>
            </select>
          </div>
          <div className="input-container">
            <label>Teamcode </label>
            <input
              type="num"
              name="teamCode"
              onChange={handleInputChange}
              required
              placeholder="Ex. 019393"
              maxLength={6}
            />
          </div>
          <div className="button-container sign-up-btn">
            <input type="submit" value="Sign Up" />
          </div>
          <p id="sign-in">
            Already have an account?
            <Link to={"/login"} className="forgotPwdClass">
              <span id="sign-in-link"> Sign In</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
