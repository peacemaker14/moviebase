import { useParams } from 'wouter';
import { useLocation } from 'wouter';

import { useMovieCredits, useMovieDetails } from '../../hooks/movie';

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: movie,
    isLoading: isMovieLoading,
    isError: isMovieError,
  } = useMovieDetails(id);

  const {
    data: credits,
    isLoading: isCreditsLoading,
    isError: isCreditsError,
  } = useMovieCredits(id);

  const [, setLocation] = useLocation();
  if (isMovieLoading || isCreditsLoading) {
    return (
      <p className="text-gray-500 text-center mt-8">Loading movie details...</p>
    );
  }

  if (isMovieError || isCreditsError) {
    return (
      <p className="text-red-500 text-center mt-8">
        Failed to load movie details.
      </p>
    );
  }

  if (!movie || !credits) {
    return <p className="text-gray-500 text-center mt-8">Movie not found.</p>;
  }

  const director = credits.crew.find((person) => person.job === 'Director');

  return (
    <div className="container mx-auto px-4 pb-6 pt-40 md:pt-24">
      <div className="flex flex-col lg:flex-row items-start">
        <div className="w-full lg:w-1/3 relative">
          <button
            onClick={() => setLocation('/')}
            className="appearance-none p-1 border-none rounded-full bg-indigo-500 hover:bg-indigo-600 absolute top-2 left-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <img
            src={
              movie.posterPath
                ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                : 'https://via.placeholder.com/500x750?text=No+Image'
            }
            alt={movie.title}
            className="rounded-lg shadow-md"
          />
        </div>

        <div className="w-full lg:w-2/3 lg:pl-8 mt-6 lg:mt-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {movie.title}
          </h1>
          <p className="text-gray-700 mb-4 italic">
            {movie.tagline || 'No tagline available'}
          </p>

          <p className="text-sm text-gray-600 mb-2">
            <strong>Release Date:</strong> {movie.releaseDate || 'N/A'}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Status:</strong> {movie.status || 'N/A'}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            <strong>Runtime:</strong>{' '}
            {movie.runtime ? `${movie.runtime} mins` : 'N/A'}
          </p>

          <h2 className="text-lg font-medium text-gray-900 mb-2">Overview</h2>
          <p className="text-gray-800 mb-4">
            {movie.overview || 'No overview available'}
          </p>

          <h2 className="text-lg font-medium text-gray-900 mb-2">Genres</h2>
          <ul className="list-disc pl-5 text-gray-700 mb-4">
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>

          <h2 className="text-lg font-medium text-gray-900 mb-2">Director</h2>
          <p className="text-gray-800 mb-4">{director?.name || '-'}</p>

          <h2 className="text-lg font-medium text-gray-900 mb-2">Cast</h2>
          <ul className="flex flex-wrap gap-4">
            {credits.cast.slice(0, 10).map((actor) => (
              <li key={actor.id} className="w-28 text-center">
                <img
                  src={
                    actor.profilePath
                      ? `https://image.tmdb.org/t/p/w185${actor.profilePath}`
                      : 'https://via.placeholder.com/92x138?text=No+Image'
                  }
                  alt={actor.name}
                  className="w-full h-auto rounded-md shadow-md"
                />
                <p className="text-sm font-medium text-gray-900 mt-2">
                  {actor.name}
                </p>
                <p className="text-xs text-gray-600">{actor.character}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
