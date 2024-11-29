import { Link, useLocation } from 'wouter';

import SearchMovie from '../search-movie';

const Navbar = () => {
  const [location] = useLocation();
  const categories = [
    { name: 'Now Playing', path: '/now-playing' },
    { name: 'Popular', path: '/popular' },
    { name: 'Top Rated', path: '/top-rated' },
    { name: 'Upcoming', path: '/upcoming' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <header className="py-4 flex flex-col md:flex-row md:gap-8 gap-4 md:px-20 items-center">
        <Link href="/">
          <a className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition">
            MovieBase
          </a>
        </Link>

        <SearchMovie />

        <nav className="flex justify-center md:space-x-4 md:ml-auto w-full md:w-auto order-last md:order-none">
          {categories.map((tab) => (
            <Link key={tab.path} href={tab.path}>
              <a
                className={`text-xs xl:text-sm font-semibold transition px-4 py-2 rounded-full text-slate-900 ${
                  location === tab.path
                    ? 'bg-stone-100 hover:text-slate-900'
                    : 'hover:text-slate-600'
                }`}
              >
                {tab.name}
              </a>
            </Link>
          ))}
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
