import React, { useState } from 'react';
import Background from '../Background';
import { createUserAPI } from '../../api/calls';

import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";
import ThemeToggleButton from './ThemeToggleButton';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate('/login');
  }

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

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
const handleSubmit = async (e) => {
  e.preventDefault();

  if (validateForm()) {
    try {
      setLoading(true);
      const res = await createUserAPI({ name, email, password });

      if (res.success) {
        setLoading(false);
        toast.success("Account created successfully!");
      } else {
        console.log("ERROR - ", res.error);
        toast.error(res.message || "Error while creating account");
      }

    } catch (error) {
      console.error("Signup error:", error);
    }finally{
      setLoading(false);
    }
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
            <h2 className="mb-2 text-3xl font-bold text-[var(--theme-text)]">Create Account</h2>
            <p className="text-[var(--theme-muted)]">Sign up to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-[var(--theme-muted)]">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`theme-input rounded-lg px-4 py-3 transition-all duration-200 ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

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
              {loading? 'Please Wait...':'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[var(--theme-muted)]">
              Already have an account?{' '}
              <a href="" className="font-medium text-[var(--theme-accent)] transition-colors duration-200 hover:text-[var(--theme-accent-strong)]" onClick={handleNavigateToLogin}>
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
