export type PoiCategory =
  | 'viewpoint'
  | 'restaurant'
  | 'campsite'
  | 'hotel'
  | 'fuel'
  | 'mechanic'
  | 'hospital'
  | 'checkpoint'
  | 'atm'
  | 'mosque'
  | 'water'
  | 'guesthouse'
  | 'cafe'
  | 'pharmacy'
  | 'tyre'
  | 'waterfall'
  | 'lake'
  | 'trail'
  | 'washroom'
  | 'parking'
  | 'hidden_gem'
  | 'attraction'
  | 'police';

export type CategoryMeta = {
  key: PoiCategory;
  label: string;
  short: string;
  color: string;
  emoji: string;
};

/** Exact labels, colours and emoji from the app seed. */
export const POI_CATEGORIES: CategoryMeta[] = [
  { key: 'viewpoint', label: 'Viewpoints & Peaks', short: 'Views', color: '#D9642C', emoji: '⛰️' },
  { key: 'restaurant', label: 'Dhabas & Food', short: 'Food', color: '#E8A33D', emoji: '☕' },
  { key: 'cafe', label: 'Cafes & Tea Stops', short: 'Cafe', color: '#B8924A', emoji: '🍵' },
  { key: 'campsite', label: 'Campsites', short: 'Camping', color: '#4CAF50', emoji: '⛺' },
  { key: 'hotel', label: 'Hotels & Stays', short: 'Stays', color: '#9A7BB8', emoji: '🛏️' },
  { key: 'guesthouse', label: 'Guest Houses', short: 'Guest', color: '#9A7BB8', emoji: '🏠' },
  { key: 'fuel', label: 'Fuel Stations', short: 'Fuel', color: '#3E92CC', emoji: '⛽' },
  { key: 'mechanic', label: 'Mechanics', short: 'Mechanic', color: '#A8A29B', emoji: '🔧' },
  { key: 'tyre', label: 'Tyre Shops', short: 'Tyres', color: '#A8A29B', emoji: '🛞' },
  { key: 'hospital', label: 'Hospitals', short: 'Medical', color: '#E63946', emoji: '🏥' },
  { key: 'pharmacy', label: 'Pharmacies', short: 'Pharmacy', color: '#E63946', emoji: '💊' },
  { key: 'checkpoint', label: 'Police Checkpoints', short: 'Checkpost', color: '#4A7FD4', emoji: '🛡️' },
  { key: 'atm', label: 'ATMs', short: 'ATM', color: '#3D9E88', emoji: '🏧' },
  { key: 'mosque', label: 'Mosques', short: 'Mosque', color: '#B8924A', emoji: '🕌' },
  { key: 'water', label: 'Water Refill', short: 'Water', color: '#3E92CC', emoji: '💧' },
  { key: 'waterfall', label: 'Waterfalls', short: 'Falls', color: '#3E92CC', emoji: '🌊' },
  { key: 'lake', label: 'Lakes', short: 'Lake', color: '#7EB0D4', emoji: '🏞️' },
  { key: 'trail', label: 'Hiking Trails', short: 'Trail', color: '#4CAF50', emoji: '🥾' },
  { key: 'washroom', label: 'Washrooms', short: 'WC', color: '#A8A29B', emoji: '🚻' },
  { key: 'parking', label: 'Parking', short: 'Park', color: '#A8A29B', emoji: '🅿️' },
  { key: 'hidden_gem', label: 'Hidden Gems', short: 'Gem', color: '#D9642C', emoji: '✨' },
  { key: 'attraction', label: 'Attractions', short: 'Attraction', color: '#B8924A', emoji: '🏛️' },
  { key: 'police', label: 'Police stations', short: 'Police', color: '#4A7FD4', emoji: '🚓' },
];

export const CATEGORY_MAP: Record<PoiCategory, CategoryMeta> = POI_CATEGORIES.reduce(
  (acc, item) => {
    acc[item.key] = item;
    return acc;
  },
  {} as Record<PoiCategory, CategoryMeta>,
);

export type WebsitePoi = {
  id: string;
  name: string;
  category: PoiCategory;
  lat: number;
  lng: number;
  region: string | null;
  description: string;
  verified: boolean;
  rating: number | null;
};
