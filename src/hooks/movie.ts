import { useQuery } from '@tanstack/react-query';

import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchNowPlaying,
  fetchPopular,
  fetchSearchMovies,
  fetchTopRated,
  fetchUpcoming,
} from '../api/movie';
import {
  CreditsResponse,
  MovieDetails,
  MovieListResponse,
} from '../types/movie';

export const useNowPlayingMovies = (page?: number) =>
  useQuery<MovieListResponse, Error>({
    queryKey: ['now_playing', page],
    queryFn: () => fetchNowPlaying(page),
  });

export const usePopularMovies = (page?: number) =>
  useQuery<MovieListResponse, Error>({
    queryKey: ['popular', page],
    queryFn: () => fetchPopular(page),
  });

export const useTopRatedMovies = (page?: number) =>
  useQuery<MovieListResponse, Error>({
    queryKey: ['top_rated', page],
    queryFn: () => fetchTopRated(page),
  });

export const useUpcomingMovies = (page?: number) =>
  useQuery<MovieListResponse, Error>({
    queryKey: ['upcoming', page],
    queryFn: () => fetchUpcoming(page),
  });

export const useMovieDetails = (id: string) =>
  useQuery<MovieDetails, Error>({
    queryKey: ['movie_details', id],
    queryFn: () => fetchMovieDetails(id),
    enabled: !!id,
  });

export const useSearchMovies = (query: string, page?: number) =>
  useQuery<MovieListResponse, Error>({
    queryKey: ['search_movies', query, page],
    queryFn: () => fetchSearchMovies(query, page),
    enabled: !!query,
  });

export const useMovieCredits = (id: string) =>
  useQuery<CreditsResponse, Error>({
    queryKey: ['movieCredits', id],
    queryFn: () => fetchMovieCredits(id),
    enabled: !!id,
  });
