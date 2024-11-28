// src/types/movie.ts
export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  totalPages: number;
  totalResults: number;
}

export interface MovieDetails extends Movie {
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string | null;
  runtime: number;
  status: string;
  tagline: string | null;
  revenue: number;
}

export type MovieListResponse = PaginatedResponse<Movie>;
