import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--theme-border)] bg-[var(--theme-surface)] backdrop-blur shadow-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:px-4">
        {/* Logo / Brand */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex min-w-0 flex-1 items-center gap-2 rounded-xl px-1 py-1 transition-colors hover:cursor-pointer hover:bg-black/5 sm:gap-3 sm:px-2"
        >
          <div className="h-9 w-9 overflow-hidden rounded-xl border border-[var(--theme-border)] shadow-sm">
            <img src="/logo5.png" alt="DSA Sheets Logo" className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 flex flex-col items-start leading-tight">
            <span className="truncate text-sm font-semibold tracking-normal text-[var(--theme-text)] sm:tracking-wide">
              DSA Tracker Progress
            </span>
            <span className="hidden text-xs text-[var(--theme-muted)] sm:block">
              Track · Practice · Master
            </span>
          </div>
        </button>

        {/* CTA / Auth */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <ThemeToggleButton compact className="px-2 py-2 sm:px-3" />
          <button
            className="hover:cursor-pointer rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] px-2.5 py-2 text-xs font-semibold text-[var(--theme-text)] shadow-sm transition-colors duration-200 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] sm:px-4 sm:text-sm"
            onClick={() => navigate('/reach-out')}
          >
            Reach Out
          </button>
          <button
            className="hover:cursor-pointer rounded-lg border border-[var(--theme-accent)] bg-[var(--theme-accent)] px-2.5 py-2 text-xs font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[var(--theme-accent-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] sm:px-4 sm:text-sm"
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
