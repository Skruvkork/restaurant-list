import Image from 'next/image';
import logo from '../../public/logos/logo-black.png';
import RestaurantList from './components/restaurant-list';

export default function Home() {
  return (
    <div className="mt-10 sm:mt-14 px-6 space-y-6 text-base">
      <header>
          <Image
            src={logo}
            alt="Munchies logo"
            className=' h-6 sm:h-10'
            style={{'width': 'auto', 'objectFit': 'contain'}}
          />
      </header>
      <main>
        <RestaurantList />
      </main>
    </div>
  );
}
