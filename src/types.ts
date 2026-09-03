export interface PackageOption {
  id: 'movie' | 'ps5';
  title: string;
  category: 'Cinema Screening' | 'PS5 Gaming';
  duration: string;
  paxIncluded: number;
  priceLKR: number;
  tagline: string;
  description: string;
  features: string[];
  popular?: boolean;
  badge?: string;
  image: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  label: string;
  available: boolean;
}

export interface BookingFormData {
  packageId: 'movie' | 'ps5';
  date: string;
  slotId: string;
  extraPax: number;
  addons: string[];
  specialRequests?: string;
}
