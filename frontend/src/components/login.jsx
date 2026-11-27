import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Background from '../Background';
import { googleLoginAPI, userLoginAPI } from '../../api/calls.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, useGoogleOAuth } from '@react-oauth/google';
import ThemeToggleButton from './ThemeToggleButton';
import { useTheme } from '../context/ThemeContext';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim() || '';

const GoogleLogoIcon = () => (
  <svg className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
    />
  </svg>
);

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
  const [googleButtonWidth, setGoogleButtonWidth] = useState(336);
  const [gsiLoadTimedOut, setGsiLoadTimedOut] = useState(false);
  const googleAuthInFlightRef = useRef(false);
  const googleContainerRef = useRef(null);
  const { theme } = useTheme();
  const { scriptLoadedSuccessfully } = useGoogleOAuth();

  useLayoutEffect(() => {
    const container = googleContainerRef.current;
    if (!container) return;

    const updateWidth = () => {
      const measured = Math.floor(container.getBoundingClientRect().width);
      if (!measured) return;
      const clamped = Math.min(400, Math.max(200, measured));
      setGoogleButtonWidth((prev) => (Math.abs(prev - clamped) >= 2 ? clamped : prev));
    };

    updateWidth();

    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(updateWidth);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!googleClientId || scriptLoadedSuccessfully) {
      setGsiLoadTimedOut(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setGsiLoadTimedOut(true);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [scriptLoadedSuccessfully]);

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

  const isDark = theme === 'dark';
  const isAuthBusy = loading || googleLoading;
  const isGoogleReady = Boolean(googleClientId) && scriptLoadedSuccessfully;

  const googleShellBaseClass = isDark
    ? 'border-[var(--theme-border)] bg-[#131314] text-slate-100 hover:bg-[#1c1d1f]'
    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300';

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[var(--theme-background)] text-[var(--theme-text)]">
      <Background />
      <div className="absolute right-4 top-4 z-20">
        <ThemeToggleButton compact />
      </div>
      <div className="relative z-10 w-full max-w-md px-4 py-8 sm:p-6">
        <div className="theme-card rounded-2xl p-6 backdrop-blur-sm sm:p-8">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold tracking-tight text-[var(--theme-text)]">Welcome Back</h2>
            <p className="text-sm text-[var(--theme-muted)] sm:text-base">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              className="theme-button-primary w-full cursor-pointer rounded-lg px-4 py-3 font-medium transition-all duration-150 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]/40 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Please Wait...' : 'Login'}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3" role="separator" aria-label="or">
            <div className="h-px flex-1 bg-[var(--theme-border)] opacity-80" />
            <span className="select-none text-[11px] font-semibold uppercase tracking-widest text-[var(--theme-muted)]">
              OR
            </span>
            <div className="h-px flex-1 bg-[var(--theme-border)] opacity-80" />
          </div>

          <div className="space-y-3" ref={googleContainerRef}>
            {!googleClientId ? (
              <button
                type="button"
                disabled
                aria-disabled="true"
                className={`flex h-10 w-full cursor-not-allowed items-center justify-center gap-3 rounded-lg border px-4 text-sm font-medium opacity-60 transition-colors duration-150 ${googleShellBaseClass}`}
                title="Google Sign-In is unavailable because Google Client ID is not configured"
              >
                <GoogleLogoIcon />
                <span>Continue with Google</span>
              </button>
            ) : (
              <div className="relative w-full">
                {/* Keep official GoogleLogin mounted at exact form width so GSI iframe never re-initializes on loading toggles */}
                <div
                  className={`flex w-full justify-center overflow-hidden rounded-lg transition-all duration-150 focus-within:ring-2 focus-within:ring-[var(--theme-accent)]/30 ${
                    isGoogleReady && !isAuthBusy
                      ? 'opacity-100'
                      : 'pointer-events-none absolute inset-0 opacity-0'
                  }`}
                >
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    theme={isDark ? 'filled_black' : 'outline'}
                    size="large"
                    text="continue_with"
                    shape="rectangular"
                    logo_alignment="center"
                    width={googleButtonWidth}
                  />
                </div>

                {(isAuthBusy || !isGoogleReady) && (
                  <button
                    type="button"
                    disabled
                    aria-busy={googleLoading || (!isGoogleReady && !gsiLoadTimedOut)}
                    className={`flex h-10 w-full items-center justify-center gap-3 rounded-lg border px-4 text-sm font-medium shadow-xs transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]/30 ${
                      googleLoading ? 'cursor-wait' : 'cursor-not-allowed'
                    } ${googleShellBaseClass} ${
                      loading && !googleLoading ? 'opacity-60' : ''
                    }`}
                  >
                    {googleLoading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-[var(--theme-accent)]" />
                        <span>Signing in with Google...</span>
                      </>
                    ) : (
                      <>
                        <GoogleLogoIcon />
                        <span>Continue with Google</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            )}

            {!googleClientId && (
              <p className="text-center text-xs text-[var(--theme-muted)]">
                Google Sign-In is unavailable until the Google Client ID is configured.
              </p>
            )}

            {googleClientId && !scriptLoadedSuccessfully && gsiLoadTimedOut && !googleError && (
              <p className="text-center text-xs text-[var(--theme-muted)]">
                Google Sign-In could not load. Please check your connection or browser privacy settings.
              </p>
            )}

            {googleError && (
              <p
                role="alert"
                className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-center text-xs font-medium text-red-500 sm:text-sm"
              >
                {googleError}
              </p>
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--theme-muted)] sm:text-base">
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
