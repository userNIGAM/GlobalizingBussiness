import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // This ensures cookies are sent with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios interceptor to handle global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 errors globally if needed
    if (error.response?.status === 401) {
      // Clear auth state if unauthorized
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const registerUser = (data) => api.post("/auth/register", data);
export const verifyEmail = (data) => api.post("/auth/verify-email", data);
export const loginUser = (data) => api.post("/auth/login", data);
export const resendVerification = (data) => api.post("/auth/resend-verification", data);
export const forgotPassword = (data) => api.post("/auth/forgot-password", data);
export const resetPassword = (data) => api.post("/auth/reset-password", data);
export const getCurrentUser = () => api.get("/auth/me");
export const logoutUser = () => api.post("/auth/logout");

// Connection endpoints
export const createConnection = (data) => api.post("/connections", data);
export const getUserConnections = (userId) => api.get(`/connections/${userId}`);
export const checkConnection = (userId, connectedUserId) => 
  api.get("/connections/check/status", { params: { userId, connectedUserId } });
export const removeConnection = (data) => api.delete("/connections", { data });

export default api;
