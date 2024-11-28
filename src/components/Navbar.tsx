import { Link, useLocation } from 'wouter';

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

        <div className="relative w-2/3 max-w-xl">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full rounded-full bg-gray-100 pl-12 pr-6 py-3 text-sm text-slate-900 placeholder-secondary-text shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute top-1/2 left-4 h-5 w-5 text-secondary-text transform -translate-y-1/2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
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
