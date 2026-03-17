import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-neutral-200">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400 shadow-md shadow-indigo-500/30">
            <span className="text-lg font-semibold text-white">DS</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-wide text-neutral-900">
              DSA Sheets
            </span>
            <span className="text-xs text-neutral-500">
              Track · Practice · Master
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden items-center gap-6 md:flex">
          <button
            type="button"
            className="hover:cursor-pointer text-sm font-medium text-neutral-600 hover:text-blue-500 transition-colors"
            onClick={() => navigate('/')}
          >
            Home
          </button>
          <button
            type="button"
            className="hover:cursor-pointer  text-sm font-medium text-neutral-600 hover:text-blue-500 transition-colors"
            onClick={() => navigate('/striver-sheet-topics')}
          >
            Sheets
          </button>
          <button
            type="button"
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Progress
          </button>
        </div>

        {/* CTA / Auth */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            className="rounded-full border border-neutral-200 px-4 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
            onClick={() => navigate('/login')}
          >
            Log in
          </button>
          <button className="rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 px-4 py-1.5 text-xs font-semibold text-white shadow-sm shadow-indigo-500/40 hover:shadow-md hover:shadow-indigo-500/40 transition-transform transition-shadow active:scale-[0.98]">
            Get Started
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-neutral-200 p-2 text-neutral-700 hover:bg-neutral-50 md:hidden"
          aria-label="Open navigation menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h10"
            />
          </svg>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
