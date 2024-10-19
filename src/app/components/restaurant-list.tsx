'use client';

import qs from 'qs';
import { useSearchParams } from 'next/navigation';
import { CategoryFilter, PriceRangeLevel, Restaurant } from '../types';
import RestaurantCard from './restaurant-card';
import { ActiveFilters } from '../utils/query-params';

function parseQueryParams<T>(parser: (arg: string) => T, params?: string | string[], ) {
  if (!params) return [];

  if (typeof params === 'string')
    return [parser(params)];

  return params.map((param) => parser(param));
}

const matchesDeliveryTime = (
  restaurant: Restaurant,
  params?: string | string[],
) => {
  if (!params) return true;

  const parseValues = (param: string): [number, number] => {
    if (param.endsWith("+")) {
      return [parseInt(param), Math.max()];
    }
    const parts = param.split("-").map((p) => parseInt(p));
    return [parts[0], parts[1]];
  };

  const ranges =
    typeof params === "string"
      ? [parseValues(params)]
      : params.map(parseValues);

  return ranges.some(
    (range: [number, number]) =>
      restaurant.delivery_time_minutes >= range[0] &&
      restaurant.delivery_time_minutes <= range[1],
  );
};

const matchesPriceLevel = (
  restaurant: Restaurant,
  levels: PriceRangeLevel[]
) => {
  if (!levels.length) return true;
  const level = PriceRangeLevel[restaurant.priceRange];

  return levels.includes(level);
}

const matchesCategory = (
  restaurant: Restaurant,
  params?: CategoryFilter['id'] | CategoryFilter['id'][]
) => {
  if (!params || !restaurant.filter_ids) return true;
  const categories = Array.isArray(params) ? params : [params];

  return restaurant.filter_ids.some((filterId) => categories.includes(filterId));
}

type RestaurantListProps = {
  restaurants: Restaurant[];
  categories: CategoryFilter[];
}

export default function RestaurantList({ restaurants, categories }: RestaurantListProps) {
  const searchParams = useSearchParams();

  const activeFilters: ActiveFilters = qs.parse(searchParams.toString());

  const filteredRestaurants = restaurants.filter(restaurant => {
    const category = matchesCategory(restaurant, activeFilters['category']);
    const time = matchesDeliveryTime(restaurant, activeFilters['delivery-time']);
    const price = matchesPriceLevel(
      restaurant,
      parseQueryParams<PriceRangeLevel>(
        parseInt,
        activeFilters['price-range']
      )
    );

    return category && time && price;
  });

  return (
    <ul className="space-y-2.5">
      {filteredRestaurants.map(restaurant =>
        <RestaurantCard
          key={restaurant.id}
          name={restaurant.name}
          deliveryTimeMinutes={restaurant.delivery_time_minutes}
          open={restaurant.open}
          imageUrl={restaurant.image_url}
        />
      )}
    </ul>
  )
}
