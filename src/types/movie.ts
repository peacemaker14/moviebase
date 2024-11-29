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

export interface Cast {
  id: number;
  name: string;
  character: string;
  profilePath: string | null;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  profilePath: string | null;
}

export interface CreditsResponse {
  cast: Cast[];
  crew: Crew[];
}

export type MovieListResponse = PaginatedResponse<Movie>;
