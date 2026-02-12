import { MapInfo } from './types';

export const maps: MapInfo[] = [
  {
    id: 'mirage',
    name: 'Mirage',
    gradient: 'from-amber-400 to-orange-500',
    image: 'https://static.wikia.nocookie.net/cswikia/images/f/f5/De_mirage_cs2.png/revision/latest?cb=20230807124319',
  },
  {
    id: 'inferno',
    name: 'Inferno',
    gradient: 'from-red-500 to-rose-600',
    image: 'https://static.wikia.nocookie.net/cswikia/images/1/17/Cs2_inferno_remake.png/revision/latest?cb=20250730204740',
  },
  {
    id: 'nuke',
    name: 'Nuke',
    gradient: 'from-emerald-400 to-green-600',
    image: 'https://static.wikia.nocookie.net/cswikia/images/d/d6/De_nuke_cs2.png/revision/latest?cb=20240426010253',
  },
  {
    id: 'ancient',
    name: 'Ancient',
    gradient: 'from-teal-400 to-cyan-600',
    image: 'https://static.wikia.nocookie.net/cswikia/images/5/5c/De_ancient_cs2.png/revision/latest?cb=20250815011913',
  },
  {
    id: 'anubis',
    name: 'Anubis',
    gradient: 'from-violet-400 to-purple-600',
    image: 'https://static.wikia.nocookie.net/cswikia/images/a/a0/CS2_Anubis_B_site.png/revision/latest?cb=20260122021359',
  },
  {
    id: 'dust2',
    name: 'Dust II',
    gradient: 'from-yellow-400 to-amber-500',
    image: 'https://static.wikia.nocookie.net/cswikia/images/1/16/Cs2_dust2.png/revision/latest?cb=20230913150804',
  },
  {
    id: 'train',
    name: 'Train',
    gradient: 'from-blue-400 to-indigo-600',
    image: 'https://static.wikia.nocookie.net/cswikia/images/2/2c/De_train_cs2_new.png/revision/latest?cb=20250730205931',
  },
];

export function getMapById(id: string): MapInfo | undefined {
  return maps.find((m) => m.id === id);
}
