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

export const registerUser = (data) => api.post("/auth/register", data);
export const verifyEmail = (data) => api.post("/verify-email", data);

export default api;
