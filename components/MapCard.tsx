'use client';

import Link from 'next/link';
import { MapInfo } from '@/lib/types';

interface MapCardProps {
  map: MapInfo;
  lineupCount: number;
}

export default function MapCard({ map, lineupCount }: MapCardProps) {
  return (
    <Link href={`/maps/${map.id}`}>
      <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-amber-500/10">
        {/* Gradient Background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${map.gradient} opacity-90 dark:opacity-70 transition-opacity duration-500 group-hover:opacity-100`}
        />

        {/* Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-6">
          <div>
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">
              {map.name}
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/80 font-medium">
              {lineupCount} {lineupCount === 1 ? 'lineup' : 'lineups'}
            </span>
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <svg
                className="w-4 h-4 text-white transform group-hover:translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Hover Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    </Link>
  );
}
