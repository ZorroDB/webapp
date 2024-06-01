import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styling/login.css';

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    teamCode: '',
  });

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate(); // React Router's hook for navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registrationResponse = await axios.post(
        'http://localhost:4000/register',
        formData
      );

      if (
        registrationResponse.data.message === 'User registered successfully'
      ) {
        // Automatically log the user in after successful registration
        try {
          const loginResponse = await axios.post(
            'http://localhost:4000/login',
            {
              email: formData.email,
              password: formData.password,
            }
          );

          if (loginResponse.data.token) {
            // Save the token (optional: depending on your use case)
            localStorage.setItem('authToken', loginResponse.data.token);

            setIsSubmitted(true);
            setErrorMessages({});
            navigate('/dashboard'); // Redirect to a protected route
          } else {
            setErrorMessages({
              name: 'login',
              message: 'Login failed after registration.',
            });
          }
        } catch (loginError) {
          setErrorMessages({
            name: 'login',
            message:
              loginError.response?.data?.message ||
              'Login failed after registration.',
          });
        }
      } else {
        setErrorMessages({
          name: 'submission',
          message: registrationResponse.data.message,
        });
      }
    } catch (registrationError) {
      setErrorMessages({
        name: 'submission',
        message:
          registrationError.response?.data?.message ||
          'Registration failed. Please try again.',
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
        {isSubmitted ? (
          <div>Registration and login successful! Redirecting...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Full name</label>
              <input
                autoFocus
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
              {renderErrorMessage('fullName')}
            </div>
            <div className="input-container">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Ex. johndoe@gmail.com"
              />
              {renderErrorMessage('email')}
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Enter your password"
              />
              {renderErrorMessage('password')}
            </div>
            <div className="input-container">
              <label>Teamcode</label>
              <input
                type="number"
                name="teamCode"
                value={formData.teamCode}
                onChange={handleInputChange}
                required
                placeholder="Ex. 019393"
                maxLength={6}
              />
              {renderErrorMessage('teamCode')}
            </div>
            <div className="button-container sign-up-btn">
              <input type="submit" value="Sign Up" />
            </div>
            {renderErrorMessage('submission')}
            {renderErrorMessage('login')}
            <p id="sign-in">
              Already have an account?
              <Link to={'/login'} className="forgotPwdClass">
                <span id="sign-in-link"> Sign In</span>
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterScreen;
