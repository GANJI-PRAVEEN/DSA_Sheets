import React, { useRef, useState } from 'react';
import Background from '../Background';
import { googleLoginAPI, userLoginAPI } from '../../api/calls.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import ThemeToggleButton from './ThemeToggleButton';
import { useTheme } from '../context/ThemeContext';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim() || '';

const getGoogleErrorMessage = (response) => {
  const rawDetails = `${response?.message || ''} ${response?.error || ''}`.toLowerCase();

  if (
    rawDetails.includes('token used too late') ||
    rawDetails.includes('wrong number of segments') ||
    rawDetails.includes('invalid token') ||
    rawDetails.includes('pem') ||
    rawDetails.includes('malformed') ||
    rawDetails.includes('expired')
  ) {
    return 'Your Google sign-in token is invalid or expired. Please try again.';
  }

  return response?.message || 'Google authentication failed. Please try again.';
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState('');
  const googleAuthInFlightRef = useRef(false);
  const { theme } = useTheme();

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

  const completeAuthSession = (authResponse, fallbackSuccessMessage) => {
    if (!authResponse?.token) {
      const missingTokenMsg = 'Login successful, but authentication token is missing.';
      toast.error(missingTokenMsg);
      return false;
    }

    const loggedInUserData = authResponse.user;
    if (!loggedInUserData?._id || !loggedInUserData?.Email) {
      const missingUserMsg = 'Login successful, but user information is missing.';
      toast.error(missingUserMsg);
      return false;
    }

    localStorage.setItem('token', authResponse.token);

    const user = {
      _id: loggedInUserData._id,
      email: loggedInUserData.Email,
      name: loggedInUserData.Name,
    };

    localStorage.setItem('user', JSON.stringify(user));
    toast.success(authResponse.message || fallbackSuccessMessage);
    navigate('/');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading || googleLoading) return;
    if (!validateForm()) return;

    setGoogleError('');
    setLoading(true);

    try {
      const login = await userLoginAPI({ email, password });

      if (login.success) {
        completeAuthSession(login, 'Logged In successfully');
      } else {
        toast.error(login.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Unable to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    if (googleAuthInFlightRef.current || loading || googleLoading) {
      return;
    }

    if (!googleClientId) {
      const msg = 'Google Sign-In is not configured (missing Google Client ID).';
      setGoogleError(msg);
      toast.error(msg);
      return;
    }

    const credential = credentialResponse?.credential;
    if (!credential) {
      const msg = 'Google Sign-In did not return a credential. Please try again.';
      setGoogleError(msg);
      toast.error(msg);
      return;
    }

    googleAuthInFlightRef.current = true;
    setGoogleError('');
    setGoogleLoading(true);

    try {
      const res = await googleLoginAPI({ credential });

      if (res?.success) {
        const completed = completeAuthSession(res, 'Google login successful');
        if (!completed) {
          setGoogleError('Google login succeeded, but session data was incomplete.');
        }
      } else {
        const errorMessage = getGoogleErrorMessage(res);
        setGoogleError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('Google login error:', error);
      const networkErrorMsg = 'Unable to connect to the server. Please try again.';
      setGoogleError(networkErrorMsg);
      toast.error(networkErrorMsg);
    } finally {
      googleAuthInFlightRef.current = false;
      setGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    const msg = 'Google Sign-In was cancelled or failed. Please try again.';
    setGoogleError(msg);
    toast.error(msg);
  };

  const isAuthBusy = loading || googleLoading;

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
                disabled={isAuthBusy}
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
                disabled={isAuthBusy}
                className={`theme-input rounded-lg px-4 py-3 transition-all duration-200 ${errors.password ? 'border-red-500' : ''}`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isAuthBusy}
              className="theme-button-primary w-full rounded-lg py-3 px-4 font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Please Wait...' : 'Login'}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[var(--theme-border)]" />
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--theme-muted)]">
              or
            </span>
            <div className="h-px flex-1 bg-[var(--theme-border)]" />
          </div>

          <div className="space-y-3">
            {!googleClientId ? (
              <div
                role="alert"
                className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-center text-sm text-amber-500"
              >
                Google Sign-In is unavailable: Google Client ID is not configured.
              </div>
            ) : (
              <div className="relative flex w-full flex-col items-center">
                <div
                  className={`flex w-full justify-center transition-opacity duration-200 ${
                    isAuthBusy ? 'pointer-events-none opacity-60' : ''
                  }`}
                >
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    theme={theme === 'dark' ? 'filled_black' : 'outline'}
                    size="large"
                    text="signin_with"
                    shape="rectangular"
                    logo_alignment="left"
                  />
                </div>

                {googleLoading && (
                  <div className="mt-3 flex items-center justify-center gap-2 text-sm text-[var(--theme-muted)]">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--theme-border)] border-t-[var(--theme-accent)]" />
                    <span>Signing in with Google...</span>
                  </div>
                )}
              </div>
            )}

            {googleError && (
              <p
                role="alert"
                className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-center text-sm text-red-500"
              >
                {googleError}
              </p>
            )}
          </div>

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
