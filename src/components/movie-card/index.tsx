import { useLocation } from 'wouter';

import { Movie } from '../types/movie';
interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [, setLocation] = useLocation();
  const backdropUrl = movie.backdropPath
    ? `https://image.tmdb.org/t/p/w500${movie.backdropPath}`
    : 'https://via.placeholder.com/500x281?text=No+Image';
  return (
    <div
      onClick={() => setLocation(`/movie/${movie.id}`)}
      className="cursor-pointer rounded-lg bg-white shadow-md hover:shadow-lg transition overflow-hidden"
    >
      <div className="relative h-40">
        <img
          src={backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-800">{movie.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{movie.releaseDate}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-600 flex items-center">
            <svg
              className="h-5 w-5 text-yellow-400 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l.764 2.355a1 1 0 00.95.69h2.487c.969 0 1.371 1.24.588 1.81l-2.014 1.463a1 1 0 00-.364 1.118l.764 2.355c.3.921-.755 1.688-1.539 1.118l-2.014-1.463a1 1 0 00-1.176 0l-2.014 1.463c-.783.57-1.838-.197-1.539-1.118l.764-2.355a1 1 0 00-.364-1.118L2.6 7.782c-.783-.57-.38-1.81.588-1.81h2.487a1 1 0 00.95-.69l.764-2.355z" />
            </svg>
            {movie.voteAverage.toFixed(1)}
          </span>

          <span className="text-sm text-gray-500">{movie.voteCount} votes</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
