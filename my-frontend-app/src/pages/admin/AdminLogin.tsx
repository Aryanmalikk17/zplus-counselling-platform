import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { loginWithBackend, logout, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle external error messages (e.g. from ProtectedRoute)
  useEffect(() => {
    if (location.state?.error) {
      setError(location.state.error);
    }
  }, [location.state]);

  // If already logged in and admin, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated && user?.role === 'ADMIN') {
      navigate('/admin/assessments', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await loginWithBackend(email, password);
      // After login, AuthContext state will be updated directly.
    } catch (err: any) {
      console.error('Admin login failed:', err);
      if (err.response?.status === 401) {
        setError('Invalid admin credentials. Please check your email and password.');
      } else if (err.response?.status === 403) {
        setError('Access denied: You do not have administrator privileges.');
      } else {
        setError('Login failed. Please ensure the backend is running and your email is in ADMIN_EMAIL.');
      }
      setIsLoading(false);
    }
  };

  // Watch for user state changes after login attempt
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'ADMIN') {
        navigate('/admin/assessments', { replace: true });
      } else if (user.role) {
        // Logged in but not an admin
        setError('Unauthorized: Admin privileges required.');
        logout(); // Force logout as requested
        setIsLoading(false);
      }
    }
  }, [isAuthenticated, user, navigate, logout]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-transparent">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-elevated-medium border border-white/40">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-4 bg-primary-50 rounded-2xl mb-6">
              <ShieldCheck className="h-10 w-10 text-primary-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Admin Portal</h2>
            <p className="mt-3 text-lg text-gray-500 font-medium">Secure entry for staff only</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-8 flex items-start gap-3"
            >
              <ShieldAlert className="h-5 w-5 text-red-600 mt-0.5" />
              <p className="text-red-700 text-sm font-semibold">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 ml-1">
                Admin Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/50 border-2 border-transparent focus:border-primary-500 focus:bg-white rounded-2xl py-4 pl-12 pr-4 transition-all duration-300 outline-none shadow-sm text-gray-900"
                  placeholder="admin@zplus.com"
                />
                <Mail className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 ml-1">
                Master Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/50 border-2 border-transparent focus:border-primary-500 focus:bg-white rounded-2xl py-4 pl-12 pr-12 transition-all duration-300 outline-none shadow-sm text-gray-900"
                  placeholder="••••••••"
                />
                <Lock className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary-200 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" />
                  Authenticating...
                </>
              ) : (
                'Log into Admin Dashboard'
              )}
            </button>
          </form>

          <div className="mt-10 text-center border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-500 font-medium">
              Not a staff member?{' '}
              <button 
                onClick={() => navigate('/login')}
                className="text-primary-600 hover:underline font-bold"
              >
                Go to Student Login
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
