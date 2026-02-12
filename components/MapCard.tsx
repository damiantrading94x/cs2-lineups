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
      <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
        {/* Gradient fallback */}
        <div className={`absolute inset-0 bg-gradient-to-br ${map.gradient}`} />

        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={map.image}
          alt={map.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/70 group-hover:via-black/20 transition-all duration-300" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-5">
          <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-1">
            {map.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/80 font-medium">
              {lineupCount} {lineupCount === 1 ? 'lineup' : 'lineups'}
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 group-hover:translate-x-1 transition-all">
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
