import {
  CreditsResponse,
  MovieDetails,
  MovieListResponse,
} from '../../types/movie';
import { fetcher } from '../../utils/fetcher';

const defaultPage = 1;

export const fetchNowPlaying = (
  page: number = defaultPage
): Promise<MovieListResponse> =>
  fetcher({ endpoint: '/movie/now_playing', params: { page } });

export const fetchPopular = (
  page: number = defaultPage
): Promise<MovieListResponse> =>
  fetcher({ endpoint: '/movie/popular', params: { page } });

export const fetchTopRated = (
  page: number = defaultPage
): Promise<MovieListResponse> =>
  fetcher({ endpoint: '/movie/top_rated', params: { page } });

export const fetchUpcoming = (
  page: number = defaultPage
): Promise<MovieListResponse> =>
  fetcher({ endpoint: '/movie/upcoming', params: { page } });

export const fetchMovieDetails = (id: string): Promise<MovieDetails> =>
  fetcher({ endpoint: `/movie/${id}` });

export const fetchSearchMovies = (
  query: string,
  page: number = defaultPage
): Promise<MovieListResponse> =>
  fetcher({ endpoint: '/search/movie', params: { query, page } });

export const fetchMovieCredits = (id: string): Promise<CreditsResponse> =>
  fetcher({ endpoint: `/movie/${id}/credits` });
