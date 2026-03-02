export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 bg-slate-900 overflow-hidden">
      {/* Grid Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.06)_1px,transparent_1px)] bg-[size:50px_50px] animate-[moveGrid_20s_linear_infinite]" />

      {/* Glow Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.15),transparent_40%)]" />

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