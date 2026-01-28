import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { ThemeContext } from "./context/ThemeContext";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Otp from "./components/Auth/Otp";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import JobList from "./pages/Home/Jobs/JobList"
import JobDetail from "./pages/Home/Jobs/JobDetail";
import Networking from "./pages/Home/Network/Networking";



// Protected Route Component
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const { user, loading } = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} transition-colors duration-200`}>
      {/* All content is now route-based */}
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={user ? "/home" : "/login"} replace />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute user={user}>
                <Home />
              </ProtectedRoute>
              // <Home />
            }
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/home" replace /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/home" replace /> : <Signup />}
          />
          <Route
            path="/otp"
            element={<Otp />}
          />
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />
          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />

          {/* sidebar navigation routes */}
           <Route
            path="/jobs"
            element={<JobList />}
          />
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/network" element={<Networking />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
