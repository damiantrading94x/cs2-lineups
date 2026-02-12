'use client';

import Link from 'next/link';
import { MapInfo } from '@/lib/types';

interface MapCardProps {
  map: MapInfo;
  lineupCount: number;
}

const mapIcons: Record<string, string> = {
  mirage: '🏜️',
  inferno: '🔥',
  nuke: '☢️',
  ancient: '🗿',
  anubis: '🐍',
  dust2: '🌵',
  train: '🚂',
};

export default function MapCard({ map, lineupCount }: MapCardProps) {
  return (
    <Link href={`/maps/${map.id}`}>
      <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
        {/* Main gradient background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${map.gradient}`}
        />

        {/* Mesh gradient overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(at 0% 0%, rgba(255,255,255,0.3) 0px, transparent 50%),
              radial-gradient(at 100% 100%, rgba(0,0,0,0.3) 0px, transparent 50%)
            `,
          }}
        />

        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern
              id={`grid-${map.id}`}
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${map.id})`} />
        </svg>

        {/* Large map icon watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] opacity-20 group-hover:scale-110 group-hover:opacity-30 transition-all duration-500">
          {mapIcons[map.id]}
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-3xl mb-1">{mapIcons[map.id]}</div>
              <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                {map.name}
              </h3>
            </div>
          </div>
          <div className="flex items-center justify-between backdrop-blur-sm bg-black/10 rounded-xl px-3 py-2">
            <span className="text-sm text-white/90 font-semibold">
              {lineupCount} {lineupCount === 1 ? 'lineup' : 'lineups'}
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center group-hover:bg-white/30 group-hover:translate-x-1 transition-all">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Hover shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-transparent group-hover:via-white/10 transition-all duration-500" />
      </div>
    </Link>
  );
}
