'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getMapById } from '@/lib/maps';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Lineup, GrenadeType, Side } from '@/lib/types';
import { grenadeTypeEmoji } from '@/lib/utils';
import LineupCard from '@/components/LineupCard';
import UploadModal from '@/components/UploadModal';
import MediaViewer from '@/components/MediaViewer';

type FilterGrenadeType = GrenadeType | 'all';
type FilterSide = Side | 'all';

export default function MapPage() {
  const params = useParams();
  const router = useRouter();
  const mapId = params.mapId as string;
  const map = getMapById(mapId);

  const [lineups, setLineups] = useState<Lineup[]>([]);
  const [filteredLineups, setFilteredLineups] = useState<Lineup[]>([]);
  const [grenadeFilter, setGrenadeFilter] = useState<FilterGrenadeType>('all');
  const [sideFilter, setSideFilter] = useState<FilterSide>('all');
  const [showUpload, setShowUpload] = useState(false);
  const [viewingLineup, setViewingLineup] = useState<Lineup | null>(null);
  const [loading, setLoading] = useState(true);

  const loadLineups = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('lineups')
        .select('*')
        .eq('map_id', mapId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLineups(data || []);
    } catch (err) {
      console.error('Error loading lineups:', err);
    } finally {
      setLoading(false);
    }
  }, [mapId]);

  useEffect(() => {
    loadLineups();
  }, [loadLineups]);

  useEffect(() => {
    let result = lineups;
    if (grenadeFilter !== 'all') {
      result = result.filter((l) => l.grenade_type === grenadeFilter);
    }
    if (sideFilter !== 'all') {
      result = result.filter((l) => l.side === sideFilter);
    }
    setFilteredLineups(result);
  }, [lineups, grenadeFilter, sideFilter]);

  const handleDelete = async (id: string) => {
    if (!isSupabaseConfigured()) return;

    try {
      // Find the lineup to check if it has a stored file
      const lineup = lineups.find((l) => l.id === id);
      if (lineup && lineup.media_type !== 'link') {
        // Try to delete from storage
        const url = new URL(lineup.media_url);
        const pathParts = url.pathname.split('/lineups/');
        if (pathParts[1]) {
          await supabase.storage.from('lineups').remove([pathParts[1]]);
        }
      }

      const { error } = await supabase.from('lineups').delete().eq('id', id);
      if (error) throw error;
      setLineups((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error('Error deleting lineup:', err);
    }
  };

  if (!map) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Map not found
        </h1>
        <button
          onClick={() => router.push('/')}
          className="mt-4 text-amber-500 hover:underline"
        >
          Back to maps
        </button>
      </div>
    );
  }

  const grenadeFilters: { value: FilterGrenadeType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'smoke', label: `${grenadeTypeEmoji('smoke')} Smoke` },
    { value: 'flash', label: `${grenadeTypeEmoji('flash')} Flash` },
    { value: 'molotov', label: `${grenadeTypeEmoji('molotov')} Molly` },
    { value: 'he', label: `${grenadeTypeEmoji('he')} HE` },
  ];

  const sideFilters: { value: FilterSide; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 't', label: '🔶 T' },
    { value: 'ct', label: '🔷 CT' },
  ];

  return (
    <div className="min-h-screen">
      {/* Map Header */}
      <div className={`relative bg-gradient-to-r ${map.gradient} py-12`}>
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to maps
          </button>
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
            {map.name}
          </h1>
          <p className="text-white/80 mt-1">
            {lineups.length} {lineups.length === 1 ? 'lineup' : 'lineups'}{' '}
            saved
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Supabase Warning */}
        {!isSupabaseConfigured() && (
          <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm text-center">
            Supabase not configured. Please set up your environment variables to
            start saving lineups.
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Grenade Filter */}
          <div className="flex flex-wrap gap-2">
            {grenadeFilters.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setGrenadeFilter(value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  grenadeFilter === value
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Side Filter */}
          <div className="flex gap-2 sm:ml-auto">
            {sideFilters.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setSideFilter(value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  sideFilter === value
                    ? value === 't'
                      ? 'bg-amber-500 text-white shadow-md'
                      : value === 'ct'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Lineups Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 dark:bg-white/5 rounded-xl aspect-[4/3]"
              />
            ))}
          </div>
        ) : filteredLineups.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredLineups.map((lineup) => (
              <LineupCard
                key={lineup.id}
                lineup={lineup}
                onView={setViewingLineup}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {lineups.length > 0 ? 'No lineups match filters' : 'No lineups yet'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {lineups.length > 0
                ? 'Try changing the filters above'
                : 'Add your first lineup to get started'}
            </p>
            {lineups.length === 0 && (
              <button
                onClick={() => setShowUpload(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Lineup
              </button>
            )}
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      {!showUpload && !viewingLineup && (
        <button
          onClick={() => setShowUpload(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-110 transition-all flex items-center justify-center z-[60]"
          title="Add lineup"
        >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
      )}

      {/* Upload Modal */}
      <UploadModal
        mapId={mapId}
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
        onUploaded={loadLineups}
      />

      {/* Media Viewer */}
      {viewingLineup && (
        <MediaViewer
          lineup={viewingLineup}
          onClose={() => setViewingLineup(null)}
        />
      )}
    </div>
  );
}
