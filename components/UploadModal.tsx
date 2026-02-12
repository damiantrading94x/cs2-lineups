'use client';

import { useState, useRef, useCallback } from 'react';
import { GrenadeType, Side, MediaType } from '@/lib/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { grenadeTypeEmoji } from '@/lib/utils';

interface UploadModalProps {
  mapId: string;
  isOpen: boolean;
  onClose: () => void;
  onUploaded: () => void;
}

export default function UploadModal({
  mapId,
  isOpen,
  onClose,
  onUploaded,
}: UploadModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [grenadeType, setGrenadeType] = useState<GrenadeType>('smoke');
  const [side, setSide] = useState<Side>('t');
  const [uploadType, setUploadType] = useState<'link' | 'file'>('link');
  const [link, setLink] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [createdBy, setCreatedBy] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cs2lineups_username') || '';
    }
    return '';
  });
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter a lineup name');
      return;
    }

    if (uploadType === 'link' && !link.trim()) {
      setError('Please enter a link');
      return;
    }

    if (uploadType === 'file' && !file) {
      setError('Please select a file');
      return;
    }

    if (!isSupabaseConfigured()) {
      setError(
        'Supabase is not configured. Please set up your environment variables.'
      );
      return;
    }

    setIsUploading(true);

    try {
      let mediaUrl = '';
      let mediaType: MediaType = 'link';

      if (uploadType === 'link') {
        mediaUrl = link;
        mediaType = 'link';
      } else if (file) {
        const isImage = file.type.startsWith('image/');
        mediaType = isImage ? 'image' : 'video';

        const fileExt = file.name.split('.').pop();
        const fileName = `${mapId}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('lineups')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from('lineups').getPublicUrl(fileName);

        mediaUrl = publicUrl;
      }

      // Remember username for next time
      if (createdBy.trim()) {
        localStorage.setItem('cs2lineups_username', createdBy.trim());
      }

      const { error: insertError } = await supabase.from('lineups').insert({
        map_id: mapId,
        name: name.trim(),
        description: description.trim() || null,
        grenade_type: grenadeType,
        side,
        media_type: mediaType,
        media_url: mediaUrl,
        thumbnail_url: null,
        created_by: createdBy.trim() || null,
      });

      if (insertError) throw insertError;

      // Reset form
      setName('');
      setDescription('');
      setLink('');
      setFile(null);
      setError('');
      onUploaded();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  const grenadeTypes: { value: GrenadeType; label: string }[] = [
    { value: 'smoke', label: `${grenadeTypeEmoji('smoke')} Smoke` },
    { value: 'flash', label: `${grenadeTypeEmoji('flash')} Flash` },
    { value: 'molotov', label: `${grenadeTypeEmoji('molotov')} Molly` },
    { value: 'he', label: `${grenadeTypeEmoji('he')} HE` },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-[#1a1a2e] border-b border-gray-200 dark:border-white/10 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Add Lineup
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 flex items-center justify-center transition-colors"
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Lineup Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., A-site smoke from T-spawn"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional notes about the lineup..."
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all resize-none"
            />
          </div>

          {/* Grenade Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Grenade Type
            </label>
            <div className="grid grid-cols-4 gap-2">
              {grenadeTypes.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setGrenadeType(value)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    grenadeType === value
                      ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25'
                      : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Side */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Side
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSide('t')}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  side === 't'
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                }`}
              >
                🔶 T-Side
              </button>
              <button
                type="button"
                onClick={() => setSide('ct')}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  side === 'ct'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                }`}
              >
                🔷 CT-Side
              </button>
            </div>
          </div>

          {/* Upload Type Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Media Source
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setUploadType('link')}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  uploadType === 'link'
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                }`}
              >
                🔗 Link
              </button>
              <button
                type="button"
                onClick={() => setUploadType('file')}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  uploadType === 'file'
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                }`}
              >
                📁 Upload File
              </button>
            </div>
          </div>

          {/* Link Input */}
          {uploadType === 'link' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Video / Image Link
              </label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
              />
            </div>
          )}

          {/* File Upload */}
          {uploadType === 'file' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Upload Image or Video
              </label>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  dragActive
                    ? 'border-amber-500 bg-amber-500/5'
                    : file
                      ? 'border-green-500 bg-green-500/5'
                      : 'border-gray-300 dark:border-white/20 hover:border-amber-500/50 hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) setFile(e.target.files[0]);
                  }}
                  className="hidden"
                />
                {file ? (
                  <div>
                    <div className="text-green-500 text-2xl mb-2">✓</div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(file.size / 1024 / 1024).toFixed(1)} MB
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="text-gray-400 text-2xl mb-2">📂</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Drag & drop or click to browse
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      Images or videos up to 50MB
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Created By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              placeholder="Optional — who uploaded this?"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isUploading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Uploading...
              </span>
            ) : (
              'Add Lineup'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
