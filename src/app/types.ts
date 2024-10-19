export type RequestError = {
  error: boolean;
  reason: string;
}

export type Filter = {
  id: string;
  name: string;
}

export type CategoryFilter = Filter & {
  image_url: string;
}

export type Restaurant = {
  id: string;
  name: string;
  rating: number;
  filter_ids: CategoryFilter['id'][];
  image_url: string;
  delivery_time_minutes: number;
  price_range_id: string;
  open: boolean;
  priceRange: keyof typeof PriceRangeLevel;
}

export type RestaurantResponse = {
  restaurants: Restaurant[];
}

export type OpenStatus = {
  restaurant_id: string;
  is_open: boolean;
}

export enum PriceRangeLevel {
  '$',
  '$$',
  '$$$',
  '$$$$'
}

export type PriceRange = {
  id: string;
  range: keyof typeof PriceRangeLevel;
}

