import React, { useState } from 'react';
import './AuthPopup.css';

const AuthPopup = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-popup-overlay">
      <div className="auth-popup">
        <button className="close-btn" onClick={onClose}>×</button>
        
        {isLogin ? (
          // Login Form
          <div className="auth-form">
            <h2>Login</h2>
            <p>Welcome Back! Login to continue to your account</p>
            
            <div className="user-type">
              <button className="user-type-btn active">Travel Agent</button>
              <button className="user-type-btn">Hotelier</button>
              <button className="user-type-btn">Visitor</button>
            </div>

            <form>
              <div className="form-group">
                <label htmlFor="email">Email ID</label>
                <input type="email" id="email" placeholder="Enter your email" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" />
              </div>

              <div className="form-group">
                <label htmlFor="captcha">Enter Captcha</label>
                <div className="captcha-container">
                  <span className="captcha-text">g5mgnw</span>
                  <input type="text" id="captcha" placeholder="Enter captcha" />
                </div>
              </div>

              <button type="submit" className="submit-btn">Login</button>
            </form>

            <p className="auth-switch">
              Don't have an account?{' '}
              <span onClick={() => setIsLogin(false)}>Sign Up</span>
            </p>

            <p className="forgot-password">Forgot Password?</p>
          </div>
        ) : (
          // Registration Form
          <div className="auth-form">
            <h2>Sign Up</h2>
            <p>Create a new account to get started</p>

            <form>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" placeholder="Enter your full name" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email ID</label>
                <input type="email" id="email" placeholder="Enter your email" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Create a password" />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" placeholder="Confirm your password" />
              </div>

              <button type="submit" className="submit-btn">Sign Up</button>
            </form>

            <p className="auth-switch">
              Already have an account?{' '}
              <span onClick={() => setIsLogin(true)}>Login</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPopup;