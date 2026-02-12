import { MapInfo } from './types';

export const maps: MapInfo[] = [
  {
    id: 'mirage',
    name: 'Mirage',
    gradient: 'from-amber-400 to-orange-500',
    image: 'https://i.imgur.com/YkXCVhf.jpg',
  },
  {
    id: 'inferno',
    name: 'Inferno',
    gradient: 'from-red-500 to-rose-600',
    image: 'https://i.imgur.com/rCJN9Cy.jpg',
  },
  {
    id: 'nuke',
    name: 'Nuke',
    gradient: 'from-emerald-400 to-green-600',
    image: 'https://i.imgur.com/7RjW9xh.jpg',
  },
  {
    id: 'ancient',
    name: 'Ancient',
    gradient: 'from-teal-400 to-cyan-600',
    image: 'https://i.imgur.com/JxMQB6M.jpg',
  },
  {
    id: 'anubis',
    name: 'Anubis',
    gradient: 'from-violet-400 to-purple-600',
    image: 'https://i.imgur.com/0Vk8ZRu.jpg',
  },
  {
    id: 'dust2',
    name: 'Dust II',
    gradient: 'from-yellow-400 to-amber-500',
    image: 'https://i.imgur.com/mZeuyCr.jpg',
  },
  {
    id: 'train',
    name: 'Train',
    gradient: 'from-blue-400 to-indigo-600',
    image: 'https://i.imgur.com/k6wqFGo.jpg',
  },
];

export function getMapById(id: string): MapInfo | undefined {
  return maps.find((m) => m.id === id);
}
