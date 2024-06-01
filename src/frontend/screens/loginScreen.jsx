import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = formData;

    // Client-side validation
    if (!email || !password) {
      setErrorMessages({
        name: 'submission',
        message: 'Please enter both email and password',
      });
      return;
    }

    // Request to backend server.
    axios
      .post('http://localhost:4000/api/auth/login', formData)
      .then((response) => {
        console.log('successfully logged in.');
        // Successful login
        setIsSubmitted(true);
        // Store the token
        localStorage.setItem('token', response.data.token);
        // Redirect to dashboard
        navigate('/dashboard');
      })
      .catch((error) => {
        // Error during login
        setErrorMessages({
          name: 'submission',
          message: error.response.data.message || 'Invalid email or password',
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
                autoFocus
                type="text"
                name="email"
                placeholder="Please enter your email address..."
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {renderErrorMessage('email')}
            </div>
            <div className="input-container">
              <label>Password </label>
              <input
                type="password"
                name="password"
                placeholder="Please enter your password..."
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {renderErrorMessage('password')}
              <Link to={'/forgot'} className="forgotPwdClass">
                <span id="forgot_pwd">Forgot password?</span>
              </Link>
            </div>
            <div className="btn-container">
              <div className="button-container">
                <input type="submit" value="Log In" />
              </div>
              <div className="button-container">
                <Link to={'/'} className="forgotPwdClass">
                  <input type="button" value="Return" />
                </Link>
              </div>
            </div>
            {renderErrorMessage('submission')}
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
