import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Auth.css';

const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get email from location state (from Signup or ForgotPassword)
    const stateEmail = location.state?.email || '';
    setEmail(stateEmail);
    
    // Start countdown timer
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Focus first input on mount
    inputRefs.current[0]?.focus();

    return () => clearInterval(interval);
  }, [location]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit if all fields are filled
    if (newOtp.every(digit => digit !== '') && index === 5) {
      handleSubmit();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    const pasteArray = pasteData.split('');
    
    const newOtp = [...otp];
    pasteArray.forEach((char, index) => {
      if (index < 6 && /^\d$/.test(char)) {
        newOtp[index] = char;
      }
    });
    
    setOtp(newOtp);
    
    // Focus last filled input
    const lastIndex = Math.min(pasteArray.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock OTP verification
      console.log('Verifying OTP:', otpString, 'for email:', email);
      // In real app: await authService.verifyOtp(email, otpString);
      
      // Navigate based on context
      if (location.state?.from === 'forgot-password') {
        navigate('/reset-password', { state: { email, otp: otpString } });
      } else {
        navigate('/login', { state: { message: 'Account verified successfully!' } });
      }
    } catch (error) {
      setError(error.message || 'Invalid OTP. Please try again.');
      // Clear OTP on error
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResendDisabled(true);
    setTimer(60);
    setError('');
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();

    try {
      // Simulate resend API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Resending OTP to:', email);
      // In real app: await authService.resendOtp(email);
      
      // Start timer again
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
        console.log(error)
      setError('Failed to resend OTP. Please try again.');
      setIsResendDisabled(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Verify Your Account</h2>
          <p>
            Enter the 6-digit code sent to
            <br />
            <strong>{email || 'your email'}</strong>
          </p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="otp-form">
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="otp-input"
                autoComplete="off"
                inputMode="numeric"
              />
            ))}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading || otp.some(digit => digit === '')}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Verifying...
              </>
            ) : 'Verify OTP'}
          </button>
        </form>

        <div className="otp-timer">
          <p>
            Didn't receive code?{' '}
            {isResendDisabled ? (
              <span className="timer">
                Resend in {formatTime(timer)}
              </span>
            ) : (
              <button 
                className="resend-link"
                onClick={handleResendOtp}
              >
                Resend OTP
              </button>
            )}
          </p>
        </div>

        <div className="otp-note">
          <p>
            <i className="fas fa-info-circle"></i>
            The OTP is valid for 10 minutes
          </p>
        </div>

        <div className="auth-footer">
          <p>
            <button 
              className="back-link"
              onClick={() => navigate('/login')}
            >
              ← Back to Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Otp;