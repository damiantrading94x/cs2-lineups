export type GrenadeType = 'smoke' | 'flash' | 'molotov' | 'he';
export type Side = 't' | 'ct';
export type MediaType = 'link' | 'image' | 'video';

export interface Lineup {
  id: string;
  map_id: string;
  name: string;
  description: string | null;
  grenade_type: GrenadeType;
  side: Side;
  media_type: MediaType;
  media_url: string;
  thumbnail_url: string | null;
  created_at: string;
  created_by: string | null;
}

export interface MapInfo {
  id: string;
  name: string;
  gradient: string;
}
