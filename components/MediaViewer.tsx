'use client';

import { Lineup } from '@/lib/types';
import {
  getYouTubeEmbedUrl,
  isYouTubeUrl,
  grenadeTypeEmoji,
  grenadeTypeLabel,
  sideLabel,
} from '@/lib/utils';

interface MediaViewerProps {
  lineup: Lineup;
  onClose: () => void;
}

export default function MediaViewer({ lineup, onClose }: MediaViewerProps) {
  const isYT = lineup.media_type === 'link' && isYouTubeUrl(lineup.media_url);
  const embedUrl = isYT ? getYouTubeEmbedUrl(lineup.media_url) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/10">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate">
              {lineup.name}
            </h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {grenadeTypeEmoji(lineup.grenade_type)}{' '}
                {grenadeTypeLabel(lineup.grenade_type)}
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded ${
                  lineup.side === 't'
                    ? 'bg-amber-500/20 text-amber-500'
                    : 'bg-blue-500/20 text-blue-500'
                }`}
              >
                {sideLabel(lineup.side)}
              </span>
              {lineup.created_by && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  by {lineup.created_by}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0 ml-4"
          >
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Media */}
        <div className="flex-1 overflow-y-auto">
          {embedUrl ? (
            <div className="aspect-video">
              <iframe
                src={embedUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : lineup.media_type === 'video' ? (
            <div className="aspect-video">
              <video
                src={lineup.media_url}
                controls
                className="w-full h-full object-contain bg-black"
              />
            </div>
          ) : lineup.media_type === 'image' ? (
            <div className="p-4 flex justify-center">
              <img
                src={lineup.media_url}
                alt={lineup.name}
                className="max-w-full max-h-[60vh] object-contain rounded-lg"
              />
            </div>
          ) : lineup.media_type === 'link' ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                External link:
              </p>
              <a
                href={lineup.media_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-500 hover:text-amber-400 underline break-all"
              >
                {lineup.media_url}
              </a>
            </div>
          ) : null}

          {/* Description */}
          {lineup.description && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-white/10">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {lineup.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
