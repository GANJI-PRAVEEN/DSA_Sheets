import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggleButton = ({ compact = false, className = '', showLabel = true }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`inline-flex items-center gap-2 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-2 text-sm font-semibold text-[var(--theme-text)] shadow-sm transition-colors hover:bg-[var(--theme-surface-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] ${className}`}
    >
      <span className="flex h-5 w-5 items-center justify-center text-base leading-none">
        {isDark ? '☀' : '☾'}
      </span>
      {!compact && showLabel && <span>{isDark ? 'Light' : 'Dark'}</span>}
    </button>
  );
};

export default ThemeToggleButton;