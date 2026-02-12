import { MapInfo } from './types';

export const maps: MapInfo[] = [
  {
    id: 'mirage',
    name: 'Mirage',
    gradient: 'from-amber-400 to-orange-500',
    image: '/api/map-image/mirage',
  },
  {
    id: 'inferno',
    name: 'Inferno',
    gradient: 'from-red-500 to-rose-600',
    image: '/api/map-image/inferno',
  },
  {
    id: 'nuke',
    name: 'Nuke',
    gradient: 'from-emerald-400 to-green-600',
    image: '/api/map-image/nuke',
  },
  {
    id: 'ancient',
    name: 'Ancient',
    gradient: 'from-teal-400 to-cyan-600',
    image: '/api/map-image/ancient',
  },
  {
    id: 'anubis',
    name: 'Anubis',
    gradient: 'from-violet-400 to-purple-600',
    image: '/api/map-image/anubis',
  },
  {
    id: 'dust2',
    name: 'Dust II',
    gradient: 'from-yellow-400 to-amber-500',
    image: '/api/map-image/dust2',
  },
  {
    id: 'train',
    name: 'Train',
    gradient: 'from-blue-400 to-indigo-600',
    image: '/api/map-image/train',
  },
];

export function getMapById(id: string): MapInfo | undefined {
  return maps.find((m) => m.id === id);
}
