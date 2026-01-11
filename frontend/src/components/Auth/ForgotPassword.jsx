import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();

  const validateEmail = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail()) {
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful email sent
      console.log('Password reset email sent to:', email);
      // In real app: await authService.forgotPassword(email);
      
      setIsEmailSent(true);
    } catch (error) {
      setError(error.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleResendEmail = () => {
    // Implement resend logic
    console.log('Resending email to:', email);
    // Call API again
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <button 
          className="back-button"
          onClick={handleBackToLogin}
        >
          <FaArrowLeft /> Back to Login
        </button>

        <div className="auth-header">
          <h2>Forgot Password</h2>
          <p>
            {isEmailSent 
              ? 'Check your email for reset instructions'
              : 'Enter your email address and we will send you a reset link'
            }
          </p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {isEmailSent ? (
          <div className="email-sent-container">
            <div className="email-sent-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <p className="email-sent-message">
              We've sent password reset instructions to:
              <br />
              <strong>{email}</strong>
            </p>
            <div className="email-actions">
              <button 
                className="btn btn-secondary"
                onClick={handleResendEmail}
              >
                Resend Email
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/login')}
              >
                Back to Login
              </button>
            </div>
            <p className="email-note">
              Didn't receive the email? Check your spam folder or try again.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                autoFocus
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : 'Send Reset Link'}
            </button>
          </form>
        )}

        <div className="auth-footer">
          <p>
            Remember your password?{' '}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;