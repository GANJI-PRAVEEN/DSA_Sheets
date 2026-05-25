import { useTheme } from './context/ThemeContext';

export default function Background() {
  const { theme } = useTheme();

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-100'}`}>
      {/* Grid Layer */}
      <div className={`absolute inset-0 bg-[size:50px_50px] animate-[moveGrid_20s_linear_infinite] ${theme === 'dark' ? 'bg-[linear-gradient(rgba(0,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.06)_1px,transparent_1px)]' : 'bg-[linear-gradient(rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.05)_1px,transparent_1px)]'}`} />

      {/* Glow Layer */}
      <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.15),transparent_40%)]' : 'bg-[radial-gradient(circle_at_20%_30%,rgba(37,99,235,0.12),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(14,165,233,0.10),transparent_40%)]'}`} />

      <style>
        {`
          @keyframes moveGrid {
            from { transform: translateY(0); }
            to { transform: translateY(50px); }
          }
        `}
      </style>
    </div>
  );
}