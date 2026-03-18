import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur shadow-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:px-4">
        {/* Logo / Brand */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex min-w-0 flex-1 items-center gap-2 rounded-xl px-1 py-1 transition-colors hover:cursor-pointer hover:bg-neutral-50 sm:gap-3 sm:px-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-100 bg-linear-to-tr from-indigo-600 to-sky-500 shadow-sm">
            <span className="text-sm font-semibold text-white">DS</span>
          </div>
          <div className="min-w-0 flex flex-col items-start leading-tight">
            <span className="truncate text-sm font-semibold tracking-normal text-neutral-900 sm:tracking-wide">
              DSA Tracker Progress
            </span>
            <span className="hidden text-xs text-neutral-500 sm:block">
              Track · Practice · Master
            </span>
          </div>
        </button>

        {/* CTA / Auth */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            className="hover:cursor-pointer rounded-lg border border-neutral-300 bg-white px-2.5 py-2 text-xs font-semibold text-neutral-800 shadow-sm transition-colors duration-200 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-300 sm:px-4 sm:text-sm"
            onClick={() => navigate('/reach-out')}
          >
            Reach Out
          </button>
          <button
            className="hover:cursor-pointer rounded-lg border bg-blue-600 px-2.5 py-2 text-xs font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-300 sm:px-4 sm:text-sm"
            onClick={() => navigate('/login')}
          >
            Log Out
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
