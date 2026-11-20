import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-md w-full rounded-2xl p-8 glass-card border border-purple-500/30 text-center space-y-6">
        <span className="inline-block text-6xl font-extrabold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
          404
        </span>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Página no encontrada
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            La página a la que intentas acceder no existe o fue movida.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-500/25 transition-all cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Volver al inicio</span>
        </Link>
      </div>
    </div>
  );
}
