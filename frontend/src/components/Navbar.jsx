import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur shadow-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo / Brand */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-3 rounded-xl px-2 py-1 transition-colors hover:bg-neutral-50 hover:cursor-pointer"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-100 bg-linear-to-tr from-indigo-600 to-sky-500 shadow-sm">
            <span className="text-sm font-semibold text-white">DS</span>
          </div>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-sm font-semibold tracking-wide text-neutral-900">
              DSA Sheets
            </span>
            <span className="text-xs text-neutral-500">
              Track · Practice · Master
            </span>
          </div>
        </button>

        {/* CTA / Auth */}
        <div className="flex items-center">
          <button
            className="hover:cursor-pointer rounded-lg border  bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-300"
            onClick={() => navigate('/login')}
          >
            Log in
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
