export const PACKAGES = {
  movie: { id: 'movie', title: 'Private Movie Theater Experience', priceLkr: 3000, paxIncluded: 3 },
  ps5: { id: 'ps5', title: 'PS5 Next-Gen Gaming Lounge', priceLkr: 3500, paxIncluded: 3 }
} as const;

export const SLOTS = {
  'slot-1': { id: 'slot-1', time: '10:00 AM - 01:00 PM', label: 'Morning Matinee' },
  'slot-2': { id: 'slot-2', time: '01:30 PM - 04:30 PM', label: 'Afternoon Premiere' },
  'slot-3': { id: 'slot-3', time: '05:00 PM - 08:00 PM', label: 'Prime Sunset Session' },
  'slot-4': { id: 'slot-4', time: '08:30 PM - 11:30 PM', label: 'Late Night Blockbuster' }
} as const;

export const ADDONS = {
  'popcorn-combo': 800,
  'beverage-bucket': 650,
  'celebration-decor': 2000,
  'extra-hour': 1200
} as const;

export function calculateTotal(packageId: keyof typeof PACKAGES, guests: number, addonIds: string[]) {
  const pkg = PACKAGES[packageId];
  const extraPax = Math.max(0, guests - pkg.paxIncluded);
  const addons = addonIds.reduce((sum, id) => sum + (ADDONS[id as keyof typeof ADDONS] ?? 0), 0);
  return pkg.priceLkr + extraPax * 1000 + addons;
}
