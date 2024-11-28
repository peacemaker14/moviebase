// src/api/movie.ts
import { MovieDetails, MovieListResponse } from '../types/movie';
import { fetcher } from '../utils/fetcher';

export const fetchNowPlaying = (page: number): Promise<MovieListResponse> =>
  fetcher({ endpoint: '/movie/now_playing', params: { page } });

export const fetchPopular = (page: number): Promise<MovieListResponse> =>
  fetcher({ endpoint: '/movie/popular', params: { page } });

export const fetchTopRated = (page: number): Promise<MovieListResponse> =>
  fetcher({ endpoint: '/movie/top_rated', params: { page } });

export const fetchUpcoming = (page: number): Promise<MovieListResponse> =>
  fetcher({ endpoint: '/movie/upcoming', params: { page } });

export const fetchMovieDetails = (id: string): Promise<MovieDetails> =>
  fetcher({ endpoint: `/movie/${id}` });

export const fetchSearchMovies = (
  query: string,
  page: number
): Promise<MovieListResponse> =>
  fetcher({ endpoint: '/search/movie', params: { query, page } });
