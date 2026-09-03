import { PackageOption, TimeSlot } from '../types';

export const PACKAGES: PackageOption[] = [
  {
    id: 'movie',
    title: 'Private Movie Theater Experience',
    category: 'Cinema Screening',
    duration: '3 Hours',
    paxIncluded: 3,
    priceLKR: 3000,
    tagline: 'Movie • 3h • 3 Pax • Rs. 3,000',
    description: 'Immerse yourself and 2 companions in a private cinema hall with 4K laser projection, Dolby 7.1 surround sound, and luxury plush recliners.',
    features: [
      '3 full hours of uninterrupted private screening',
      'Accommodates up to 3 people (Extra pax: Rs. 1,000/person)',
      '150-inch Ultra HD 4K laser display',
      'Dolby 7.1 Atmos surround acoustic system',
      'Stream Netflix, Disney+, Prime Video or bring your own movie (USB / HDMI)',
      'Plush leather electric recliners with food trays',
      'Complimentary welcome beverage & cold towels'
    ],
    popular: true,
    badge: 'Most Popular',
    image: '/1.jpg'
  },
  {
    id: 'ps5',
    title: 'PS5 Next-Gen Gaming Lounge',
    category: 'PS5 Gaming',
    duration: '3 Hours',
    paxIncluded: 3,
    priceLKR: 3500,
    tagline: 'PS5 • 3h • 3 Pax • Rs. 3,500',
    description: 'Level up your gaming sessions with PlayStation 5 on a massive cinema screen with low-latency mode and haptic surround sound.',
    features: [
      '3 full hours of high-performance PS5 gaming',
      'Includes 3 players (Extra pax: Rs. 1,000/person)',
      'Up to 4 Wireless DualSense wireless controllers',
      '4K 120Hz Ultra HD high-frame-rate display mode',
      'Top titles ready: EA FC 24, Spider-Man 2, Tekken 8, Mortal Kombat 1, Call of Duty, Gran Turismo 7, GTA V',
      'High-speed fiber internet for seamless multiplayer',
      'Ergonomic gaming seats & refreshments tray'
    ],
    badge: 'Gamer Choice',
    image: '/ps5_lounge.jpg'
  }
];

export const TIME_SLOTS: TimeSlot[] = [
  { id: 'slot-1', time: '10:00 AM - 01:00 PM', label: 'Morning Matinee', available: true },
  { id: 'slot-2', time: '01:30 PM - 04:30 PM', label: 'Afternoon Premiere', available: true },
  { id: 'slot-3', time: '05:00 PM - 08:00 PM', label: 'Prime Sunset Session', available: true },
  { id: 'slot-4', time: '08:30 PM - 11:30 PM', label: 'Late Night Blockbuster', available: true }
];

export const ADDONS = [
  { id: 'popcorn-combo', name: 'Jumbo Popcorn & Dip Combo', priceLKR: 800, desc: 'Fresh butter caramel popcorn + nacho cheese' },
  { id: 'beverage-bucket', name: 'Chilled Soda & Mocktail Bucket', priceLKR: 650, desc: '4 ice-cold beverages of your choice' },
  { id: 'celebration-decor', name: 'Birthday / Anniversary Deco & Cake Setup', priceLKR: 2000, desc: 'Ambient fairy lights, neon sign & celebration banner' },
  { id: 'extra-hour', name: 'Extra 1 Hour Extension', priceLKR: 1200, desc: 'Subject to slot availability after your booking' }
];
