'use client';

import { useState, useEffect } from 'react';
import MapCard from '@/components/MapCard';
import { maps } from '@/lib/maps';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function Home() {
  const [lineupCounts, setLineupCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (isSupabaseConfigured()) {
      loadLineupCounts();
    }
  }, []);

  async function loadLineupCounts() {
    try {
      const { data } = await supabase.from('lineups').select('map_id');

      if (data) {
        const counts: Record<string, number> = {};
        data.forEach((item) => {
          counts[item.map_id] = (counts[item.map_id] || 0) + 1;
        });
        setLineupCounts(counts);
      }
    } catch (err) {
      console.error('Error loading lineup counts:', err);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          CS2{' '}
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Lineups
          </span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Save and share grenade lineups with your squad. Never forget a smoke
          again.
        </p>
      </div>

      {/* Supabase Warning */}
      {!isSupabaseConfigured() && (
        <div className="mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm text-center">
          Supabase not configured. Set{' '}
          <code className="font-mono bg-amber-500/10 px-1.5 py-0.5 rounded">
            NEXT_PUBLIC_SUPABASE_URL
          </code>{' '}
          and{' '}
          <code className="font-mono bg-amber-500/10 px-1.5 py-0.5 rounded">
            NEXT_PUBLIC_SUPABASE_ANON_KEY
          </code>{' '}
          in your{' '}
          <code className="font-mono bg-amber-500/10 px-1.5 py-0.5 rounded">
            .env.local
          </code>{' '}
          file.
        </div>
      )}

      {/* Map Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {maps.map((map) => (
          <MapCard
            key={map.id}
            map={map}
            lineupCount={lineupCounts[map.id] || 0}
          />
        ))}
      </div>
    </div>
  );
}
