import { Suspense } from 'react';
import { OpenStatus, Restaurant, RestaurantResponse, RequestError, PriceRange, CategoryFilter } from '../types';
import RestaurantList from './restaurant-list';

const getRestaurantOpenStatus = async (restaurantId: Restaurant['id']) => {
  const res = await fetch(`${process.env.API_URL}/open/${restaurantId}`);
  const response: OpenStatus | RequestError = await res.json();

  if ('error' in response) {
    return Promise.reject(response.reason);
  }

  return response.is_open;
}

const getRestaurantPriceRange = async (priceRangeId: Restaurant['price_range_id']) => {
  const res = await fetch(`${process.env.API_URL}/price-range/${priceRangeId}`);
  const response: PriceRange | RequestError = await res.json();

  if ('error' in response) {
    return Promise.reject(response.reason);
  }

  return response.range;
}

const getRestaurants = async () => {
  const res = await fetch(`${process.env.API_URL}/restaurants`);
  const response: RestaurantResponse = await res.json();

  const restaurants = response.restaurants.map(async (restaurant) => {
    const [openStatusResult, priceRangeResult] = await Promise.allSettled([
      getRestaurantOpenStatus(restaurant.id),
      getRestaurantPriceRange(restaurant.price_range_id),
    ]);

    if (openStatusResult.status === 'fulfilled') {
      restaurant.open = openStatusResult.value;
    } else {
      console.error(
        `Error: Could not fetch open status for restaurant ${restaurant.name}, id: ${restaurant.id} \n`,
        `Reason: ${openStatusResult.reason}`
      );
      restaurant.open = false;
    }

    if (priceRangeResult.status === 'fulfilled') {
      restaurant.priceRange = priceRangeResult.value;
    } else {
      console.error(
        `Error: Could not fetch price range for restaurant ${restaurant.name}, id: ${restaurant.price_range_id} \n`,
        `Reason: ${priceRangeResult.reason}`
      );
    }
    
    return restaurant;
  });

  return Promise.all(restaurants);
}

type RestaurantSectionProps = {
  categories: CategoryFilter[];
}

export default async function RestaurantSection({ categories }: RestaurantSectionProps) {
  const restaurants = await getRestaurants();

  return (
    <section className="space-y-5 px-6 sm:pl-0">
      <h1 className="text-2xl">Restaurants</h1>

      <Suspense>
        <RestaurantList restaurants={restaurants} categories={categories}  />
      </Suspense>
    </section>
  )
}
