import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

import { useSearchMovies } from '../hooks/movie';
import { Movie } from '../types/movie';

const SearchMovie = () => {
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const { data, isLoading } = useSearchMovies(debouncedSearch, 1);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  return (
    <div className="relative w-2/3 max-w-xl mx-auto">
      <Combobox<Movie | undefined>
        onChange={(value) => {
          if (value?.id) {
            setLocation(`/movie/${value?.id}`);
          }
        }}
      >
        {/* Input Field */}
        <div className="relative">
          <ComboboxInput
            className="w-full rounded-full bg-gray-100 pl-12 pr-6 py-3 text-sm text-slate-900 placeholder-secondary-text shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="What are you looking for?"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
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

        {debouncedSearch && (
          <ComboboxOptions className="absolute top-14 left-0 w-full bg-white shadow-lg rounded-lg z-10 max-h-60 overflow-auto divide-y divide-gray-200">
            {isLoading && (
              <p className="text-sm text-gray-500 p-4">Loading results...</p>
            )}
            {data?.results.length === 0 && !isLoading && (
              <p className="text-sm text-gray-500 p-4">
                No results found for "{debouncedSearch}".
              </p>
            )}
            {data?.results.map((movie) => (
              <ComboboxOption
                key={movie.id}
                value={movie}
                className={({ focus }) =>
                  `cursor-pointer p-4 flex items-center space-x-4 ${
                    focus ? 'bg-gray-100' : ''
                  }`
                }
              >
                {({ focus }) => (
                  <>
                    {movie.posterPath ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${movie.posterPath}`}
                        alt={movie.title}
                        className="w-12 h-18 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-12 h-18 bg-gray-300 rounded-md"></div>
                    )}

                    <div>
                      <p
                        className={`text-sm ${
                          focus ? 'text-indigo-600' : 'text-gray-900'
                        }`}
                      >
                        {movie.title}
                      </p>
                      <p className="text-xs text-gray-600">
                        Release Date: {movie.releaseDate || 'N/A'}
                      </p>
                    </div>
                  </>
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </Combobox>
    </div>
  );
};

export default SearchMovie;
