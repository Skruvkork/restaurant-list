export type RequestError = {
  error: boolean;
  reason: string;
}

export type Filter = {
  id: string;
  name: string;
  image_url: string;
}

export type Restaurant = {
  id: string;
  name: string;
  rating: number;
  filterIds: Filter['id'][];
  image_url: string;
  delivery_time_minutes: number;
}

export type RestaurantResponse = {
  restaurants: Restaurant[];
}

export type OpenStatus = {
  restaurant_id: string;
  is_currently_open: boolean;
}

