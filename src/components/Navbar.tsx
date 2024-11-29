import { Link, useLocation } from 'wouter';

import SearchMovie from './SearchMovie';

const Navbar = () => {
  const [location] = useLocation(); // Get the current route
  const categories = [
    { name: 'Now Playing', path: '/now-playing' },
    { name: 'Popular', path: '/popular' },
    { name: 'Top Rated', path: '/top-rated' },
    { name: 'Upcoming', path: '/upcoming' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <header className="py-4 flex gap-8 px-8 items-center">
        <Link href="/">
          <a className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition">
            MovieBase
          </a>
        </Link>

        <SearchMovie />

        <nav className="flex justify-center space-x-8">
          {categories.map((tab) => (
            <Link key={tab.path} href={tab.path}>
              <a
                className={`text-sm font-semibold transition px-4 py-2 rounded-full text-slate-900 ${
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
