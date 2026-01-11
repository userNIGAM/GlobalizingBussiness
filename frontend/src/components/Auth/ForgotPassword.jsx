/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    }
  };

  const validateEmail = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsEmailSent(true);
    } catch (error) {
      setError(error.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = () => {
    console.log('Resending email to:', email);
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
            <div className="w-16 h-16 bg-linear-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Forgot Password
          </h1>
          <p className="text-gray-600">
            {isEmailSent 
              ? 'Check your email for instructions'
              : 'We\'ll send you a reset link'
            }
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <button
            onClick={() => navigate('/login')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Login</span>
          </button>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </motion.div>
          )}

          {isEmailSent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 bg-linear-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Email Sent!
              </h3>
              <p className="text-gray-600 mb-6">
                We've sent password reset instructions to:
                <br />
                <span className="font-semibold text-gray-900">{email}</span>
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleResendEmail}
                  className="w-full py-3 px-4 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  Resend Email
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                >
                  Back to Login
                </button>
              </div>
              <p className="mt-6 text-sm text-gray-500">
                Didn't receive the email? Check your spam folder or try again.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="you@example.com"
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-linear-to-r from-amber-600 to-orange-600 text-white py-3 px-4 rounded-xl font-medium hover:from-amber-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;