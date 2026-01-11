/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, AlertCircle, ArrowLeft, RotateCcw, CheckCircle } from 'lucide-react';

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

  const containerVariants = {
    hidden: { opacity: 0, rotateX: -10 },
    visible: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      rotateX: 10,
      transition: {
        duration: 0.3
      }
    }
  };

  useEffect(() => {
    const stateEmail = location.state?.email || '';
    setEmail(stateEmail);
    
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

    inputRefs.current[0]?.focus();

    return () => clearInterval(interval);
  }, [location]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (location.state?.from === 'forgot-password') {
        navigate('/reset-password', { state: { email, otp: otpString } });
      } else {
        navigate('/login', { 
          state: { message: 'Account verified successfully!' } 
        });
      }
    } catch (error) {
      console.log(error)
      setError('Invalid OTP. Please try again.');
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
              <Key className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Verify OTP
          </h1>
          <p className="text-gray-600">
            Enter the 6-digit code sent to
            <br />
            <span className="font-semibold text-gray-900">{email || 'your email'}</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <motion.input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                  whileFocus={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.some(digit => digit === '')}
              className="w-full bg-linear-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Verify OTP</span>
                  <CheckCircle className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {isResendDisabled ? (
                  <span className="text-gray-900 font-medium">
                    Resend in {formatTime(timer)}
                  </span>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Resend OTP</span>
                  </button>
                )}
              </div>
              <button
                onClick={() => navigate('/login')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Login</span>
              </button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-700 flex items-center justify-center space-x-2">
              <Key className="w-4 h-4" />
              <span>The OTP is valid for 10 minutes</span>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Otp;