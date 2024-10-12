import { OpenStatus, Restaurant, RestaurantResponse, RequestError } from "../types";
import RestaurantCard from "./restaurant-card"

const getRestaurantOpenStatus = async (restaurantId: Restaurant['id']) => {
  const res = await fetch(`${process.env.API_URL}/open/${restaurantId}`);
  const response: OpenStatus | RequestError = await res.json();

  if ('error' in response) {
    return Promise.reject(response.reason);
  }

  return response.is_currently_open;
}

const getRestaurants = async () => {
  const res = await fetch(`${process.env.API_URL}/restaurants`);
  const response: RestaurantResponse = await res.json();

  const restaurants = response.restaurants.map(async (restaurant) => {
    try {
      const openStatus = await getRestaurantOpenStatus(restaurant.id);
      return { ...restaurant, open: openStatus };
    } catch (error) {
      console.error(
        `Error: Could not fetch open status for restaurant ${restaurant.name}, id: ${restaurant.id} \n`,
        `Reason: ${error}`
      );
      return { ...restaurant, open: false };
    }
  });

  return Promise.all(restaurants);
}

export default async function RestaurantList() {
  const restaurants = await getRestaurants();

  return (
    <section className="space-y-5">
      <h1 className="text-2xl">Restaurants</h1>

      <ul className="space-y-2.5">
        {restaurants.map(restaurant =>
          <RestaurantCard
            key={restaurant.id}
            name={restaurant.name}
            deliveryTimeMinutes={restaurant.delivery_time_minutes}
            open={restaurant.open}
            imageUrl={restaurant.image_url}
          />
        )}
      </ul>
    </section>
  )
}
