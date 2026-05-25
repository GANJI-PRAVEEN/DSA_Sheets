import React, { useState } from 'react';
import Background from '../Background';
import {userLoginAPI} from '../../api/calls.js'
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [userData,setUserData] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    if (validateForm()) {
      // Handle login logic here
      console.log('Login attempt:', { email, password });
      const login = await userLoginAPI({email,password});
      if(login.success){
        setLoading(false);
        toast.success(login.message);
        const loggedInUserData = login.user;
        setUserData(loggedInUserData);
        const user = {
          _id:loggedInUserData._id,
          email:loggedInUserData.Email,
          name:loggedInUserData.Name
        }
        localStorage.setItem("user",JSON.stringify(user));
        console.log("LoggedInUserID",loggedInUserData._id);
        console.log("loggin user ",user);
        navigate('/');
      }
      else{
        setLoading(false);
        toast.error(login.message);
      }
      // You can add API call or navigation here
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[var(--theme-background)] text-[var(--theme-text)]">
      <Background />
      <div className="absolute right-4 top-4 z-20">
        <ThemeToggleButton compact />
      </div>
      <div className="relative z-10 w-full max-w-md p-6">
        <div className="theme-card rounded-2xl p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h2 className="mb-2 text-3xl font-bold text-[var(--theme-text)]">Welcome Back</h2>
            <p className="text-[var(--theme-muted)]">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--theme-muted)]">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`theme-input rounded-lg px-4 py-3 transition-all duration-200 ${errors.email ? 'border-red-500' : ''}`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-[var(--theme-muted)]">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`theme-input rounded-lg px-4 py-3 transition-all duration-200 ${errors.password ? 'border-red-500' : ''}`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="theme-button-primary w-full rounded-lg py-3 px-4 font-medium transition-all duration-200"
            >
              {loading? 'Please Wait...':'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[var(--theme-muted)]">
              Don't have an account?{' '}
              <a href="#" className="font-medium text-[var(--theme-accent)] transition-colors duration-200 hover:text-[var(--theme-accent-strong)]" onClick={() => navigate('/signup')}>
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
