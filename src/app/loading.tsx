export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 animate-ping" />
          <div className="w-12 h-12 rounded-full border-2 border-t-purple-500 border-r-violet-500 border-b-transparent border-l-transparent animate-spin" />
        </div>
        <p className="text-xs font-mono tracking-wider text-slate-500 dark:text-slate-400">
          Cargando portafolio...
        </p>
      </div>
    </div>
  );
}
