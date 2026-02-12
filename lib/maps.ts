import { MapInfo } from './types';

export const maps: MapInfo[] = [
  {
    id: 'mirage',
    name: 'Mirage',
    gradient: 'from-amber-400 to-orange-500',
    image: 'https://steamuserimages-a.akamaihd.net/ugc/2031730758176816337/6E663F7E18BB66D7C93470292CAD3C89FBF5A55B/',
  },
  {
    id: 'inferno',
    name: 'Inferno',
    gradient: 'from-red-500 to-rose-600',
    image: 'https://steamuserimages-a.akamaihd.net/ugc/2031730758176816569/DCE6F7F7F51E15CAE87E4077F7BD22D2D8F5D6B5/',
  },
  {
    id: 'nuke',
    name: 'Nuke',
    gradient: 'from-emerald-400 to-green-600',
    image: 'https://steamuserimages-a.akamaihd.net/ugc/2031730758176816829/B9746567F70B83EA58E1269FD311E52E5A87B6F3/',
  },
  {
    id: 'ancient',
    name: 'Ancient',
    gradient: 'from-teal-400 to-cyan-600',
    image: 'https://steamuserimages-a.akamaihd.net/ugc/2031730758176815980/ACDB4CF0B2A55F79C58925AFE9690FF18EF2F6AB/',
  },
  {
    id: 'anubis',
    name: 'Anubis',
    gradient: 'from-violet-400 to-purple-600',
    image: 'https://steamuserimages-a.akamaihd.net/ugc/2031730758176816099/2FDE30EDF6D6C6D0C2B5C0BBC5145290FE6C56E6/',
  },
  {
    id: 'dust2',
    name: 'Dust II',
    gradient: 'from-yellow-400 to-amber-500',
    image: 'https://steamuserimages-a.akamaihd.net/ugc/2031730758176816453/C808B6060843C2F8EED1F26653B5EBA3C9282978/',
  },
  {
    id: 'train',
    name: 'Train',
    gradient: 'from-blue-400 to-indigo-600',
    image: 'https://steamuserimages-a.akamaihd.net/ugc/2031730758176817014/D71A2347F50E00AA3EE703BC2E2F84C96B3FDE4F/',
  },
];

export function getMapById(id: string): MapInfo | undefined {
  return maps.find((m) => m.id === id);
}
