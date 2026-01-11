/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, AlertCircle, ArrowLeft, CheckCircle, Shield } from 'lucide-react';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  useEffect(() => {
    const state = location.state || {};
    if (!state.email || !state.otp) {
      navigate('/forgot-password');
    } else {
      setEmail(state.email);
      setOtp(state.otp);
    }
  }, [location, navigate]);

  useEffect(() => {
    calculatePasswordStrength(formData.password);
  }, [formData.password]);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Include uppercase, lowercase, and number';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/login', { 
        state: { 
          message: 'Password reset successfully! Please login with your new password.' 
        } 
      });
    } catch (error) {
      setErrors({ general: error.message || 'Password reset failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return 'from-red-500 to-red-600';
    if (passwordStrength <= 3) return 'from-amber-500 to-orange-600';
    return 'from-green-500 to-emerald-600';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  const passwordRequirements = [
    { label: 'At least 8 characters', met: formData.password.length >= 8 },
    { label: 'One lowercase letter', met: /[a-z]/.test(formData.password) },
    { label: 'One uppercase letter', met: /[A-Z]/.test(formData.password) },
    { label: 'One number', met: /\d/.test(formData.password) },
    { label: 'One special character', met: /[^A-Za-z0-9]/.test(formData.password) },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md">
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600">
            Create a strong new password
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <button
            onClick={() => navigate('/forgot-password')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <AnimatePresence>
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <p className="text-red-700 text-sm">{errors.general}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.password}</span>
                </p>
              )}

              {formData.password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Password strength</span>
                    <span className={`text-sm font-medium ${
                      passwordStrength <= 2 ? 'text-red-600' :
                      passwordStrength <= 3 ? 'text-amber-600' :
                      'text-green-600'
                    }`}>
                      {getStrengthText()}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                      className={`h-full bg-linear-to-r ${getStrengthColor()}`}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.confirmPassword}</span>
                </p>
              )}

              {formData.confirmPassword && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`mt-2 p-3 rounded-lg flex items-center space-x-2 ${
                    formData.password === formData.confirmPassword
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-red-50 border border-red-200'
                  }`}
                >
                  {formData.password === formData.confirmPassword ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-700 text-sm">
                        Passwords match
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="text-red-700 text-sm">
                        Passwords do not match
                      </span>
                    </>
                  )}
                </motion.div>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-4 bg-gray-50 rounded-xl border border-gray-200"
            >
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Password Requirements:
              </h4>
              <ul className="space-y-2">
                {passwordRequirements.map((req, index) => (
                  <motion.li
                    key={req.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center space-x-2 text-sm ${
                      req.met ? 'text-green-600' : 'text-gray-500'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      req.met ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {req.met ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-gray-400" />
                      )}
                    </div>
                    <span>{req.label}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Resetting Password...</span>
                  </>
                ) : (
                  <>
                    <span>Reset Password</span>
                    <CheckCircle className="w-5 h-5" />
                  </>
                )}
              </button>
            </motion.div>
          </form>

          <motion.div
            variants={itemVariants}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <button
                onClick={() => navigate('/login')}
                className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
              >
                Sign in
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResetPassword;