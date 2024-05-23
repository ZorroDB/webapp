import React, { useState } from "react";
import "./styling/login.css";
import { Link } from "react-router-dom";

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "employee",
    teamCode: "",
  });

  const [error, setError] = useState("");
  const history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await register(formData);
      alert("User registered successfully");
      history.push("/login"); // Redirect to login after successful registration
    } catch (error) {
      setError(error.response.data.error);
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
              <option value={"employee"} selected="selected">
                Employee
              </option>
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
