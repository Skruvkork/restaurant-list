import Image from 'next/image';
import logo from '../../public/logos/logo-black.png';
import RestaurantSection from './components/restaurant-section';
import Filters from './components/filters';
import { CategoryFilter } from './types';
import CategoryCards from './components/category-cards';
import { Suspense } from 'react';

const getRestaurantCategories = async () => {
  const res = await fetch(`${process.env.API_URL}/filter`);
  const categories: { filters: CategoryFilter[] } = await res.json();

  return categories.filters;
}

export default async function Home() {
  const categories = await getRestaurantCategories()

  return (
    <div className="mt-10 sm:mt-14 space-y-6 text-base">
      <header className="px-6">
          <Image
            src={logo}
            alt="Munchies logo"
            className="h-6 sm:h-10"
            style={{'width': 'auto', 'objectFit': 'contain'}}
          />
      </header>
      <main className="flex flex-col sm:flex-row sm:pl-6 max-w-full gap-6 sm:gap-5">
        <Filters categories={categories} />
        <div className="overflow-hidden space-y-6 sm:space-y-10">
          <Suspense>
            <CategoryCards categories={categories} />
          </Suspense>
          <RestaurantSection categories={categories} />
        </div>
      </main>
    </div>
  );
}
