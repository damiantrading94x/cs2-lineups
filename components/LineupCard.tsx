'use client';

import { Lineup } from '@/lib/types';
import {
  grenadeTypeEmoji,
  grenadeTypeLabel,
  sideLabel,
  formatDate,
  getYouTubeThumbnail,
  isYouTubeUrl,
} from '@/lib/utils';

interface LineupCardProps {
  lineup: Lineup;
  onView: (lineup: Lineup) => void;
  onDelete: (id: string) => void;
}

export default function LineupCard({ lineup, onView, onDelete }: LineupCardProps) {
  const thumbnail =
    lineup.media_type === 'link' && isYouTubeUrl(lineup.media_url)
      ? getYouTubeThumbnail(lineup.media_url)
      : lineup.media_type === 'image'
        ? lineup.media_url
        : lineup.thumbnail_url;

  return (
    <div
      className="group relative bg-white dark:bg-white/5 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 cursor-pointer"
      onClick={() => onView(lineup)}
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-gray-100 dark:bg-white/5 relative overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={lineup.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-white/5 dark:to-white/10">
            {grenadeTypeEmoji(lineup.grenade_type)}
          </div>
        )}

        {/* Play overlay for videos */}
        {(lineup.media_type === 'link' || lineup.media_type === 'video') && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <svg
                className="w-5 h-5 text-gray-900 ml-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </div>
        )}

        {/* Side badge */}
        <div
          className={`absolute top-2 right-2 px-2 py-0.5 rounded-md text-xs font-bold backdrop-blur-sm ${
            lineup.side === 't'
              ? 'bg-amber-500/80 text-white'
              : 'bg-blue-500/80 text-white'
          }`}
        >
          {sideLabel(lineup.side)}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight line-clamp-2">
          {lineup.name}
        </h3>

        <div className="flex items-center gap-2 mt-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300">
            {grenadeTypeEmoji(lineup.grenade_type)}{' '}
            {grenadeTypeLabel(lineup.grenade_type)}
          </span>
        </div>

        <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
          <span>{lineup.created_by || 'Anonymous'}</span>
          <span>{formatDate(lineup.created_at)}</span>
        </div>
      </div>

      {/* Delete button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (confirm('Delete this lineup?')) onDelete(lineup.id);
        }}
        className="absolute top-2 left-2 w-7 h-7 rounded-lg bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
        title="Delete lineup"
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}
