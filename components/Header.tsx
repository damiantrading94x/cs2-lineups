'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-[#0a0a12]/80 border-b border-gray-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-amber-500/25">
            CS
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-amber-500 transition-colors">
            CS2 Lineups
          </span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
