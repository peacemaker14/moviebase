import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useLocation, useParams } from 'wouter';

import { useMovieCredits, useMovieDetails } from '../../hooks/movie';
import MovieDetailPage from './';

// Mock the wouter hooks
vi.mock('wouter', () => ({
  useParams: vi.fn(),
  useLocation: vi.fn(),
}));

// Mock the custom hooks
vi.mock('../../hooks/movie', () => ({
  useMovieDetails: vi.fn(),
  useMovieCredits: vi.fn(),
}));

describe('MovieDetailPage', () => {
  const mockSetLocation = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(useParams).mockReturnValue({ id: '123' });
    vi.mocked(useLocation).mockReturnValue(['', mockSetLocation]);
  });

  it('renders loading state', () => {
    vi.mocked(useMovieDetails).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });
    vi.mocked(useMovieCredits).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<MovieDetailPage />);
    expect(screen.getByText('Loading movie details...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    vi.mocked(useMovieDetails).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });
    vi.mocked(useMovieCredits).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<MovieDetailPage />);
    expect(
      screen.getByText('Failed to load movie details.')
    ).toBeInTheDocument();
  });

  it('renders movie not found state', () => {
    vi.mocked(useMovieDetails).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });
    vi.mocked(useMovieCredits).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    render(<MovieDetailPage />);
    expect(screen.getByText('Movie not found.')).toBeInTheDocument();
  });

  it('renders movie details correctly', () => {
    const mockMovie = {
      title: 'Test Movie',
      tagline: 'Test Tagline',
      releaseDate: '2023-01-01',
      status: 'Released',
      runtime: 120,
      overview: 'Test Overview',
      genres: [{ id: 1, name: 'Action' }],
      posterPath: '/test-poster.jpg',
    };

    const mockCredits = {
      crew: [{ job: 'Director', name: 'Test Director' }],
      cast: [
        {
          id: 1,
          name: 'Actor 1',
          character: 'Character 1',
          profilePath: '/actor1.jpg',
        },
      ],
    };

    vi.mocked(useMovieDetails).mockReturnValue({
      data: mockMovie,
      isLoading: false,
      isError: false,
    });
    vi.mocked(useMovieCredits).mockReturnValue({
      data: mockCredits,
      isLoading: false,
      isError: false,
    });

    render(<MovieDetailPage />);

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Test Tagline')).toBeInTheDocument();
    expect(screen.getByText('Release Date:')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('Released')).toBeInTheDocument();
    expect(screen.getByText('Runtime:')).toBeInTheDocument();
    expect(screen.getByText('120 mins')).toBeInTheDocument();
    expect(screen.getByText('Test Overview')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Test Director')).toBeInTheDocument();
    expect(screen.getByText('Actor 1')).toBeInTheDocument();
    expect(screen.getByText('Character 1')).toBeInTheDocument();

    const posterImage = screen.getByAltText('Test Movie') as HTMLImageElement;
    expect(posterImage.src).toContain(
      'https://image.tmdb.org/t/p/w500/test-poster.jpg'
    );
  });

  it('handles missing data gracefully', () => {
    const mockMovie = {
      title: 'Test Movie',
      tagline: '',
      releaseDate: '',
      status: '',
      runtime: null,
      overview: '',
      genres: [],
      posterPath: null,
    };

    const mockCredits = {
      crew: [],
      cast: [],
    };

    vi.mocked(useMovieDetails).mockReturnValue({
      data: mockMovie,
      isLoading: false,
      isError: false,
    });
    vi.mocked(useMovieCredits).mockReturnValue({
      data: mockCredits,
      isLoading: false,
      isError: false,
    });

    render(<MovieDetailPage />);

    expect(screen.getByText('No tagline available')).toBeInTheDocument();
    expect(screen.getAllByText('N/A')[0]).toBeInTheDocument();
    expect(screen.getByText('No overview available')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument(); // Director not found

    const posterImage = screen.getByAltText('Test Movie') as HTMLImageElement;
    expect(posterImage.src).toContain(
      'https://via.placeholder.com/500x750?text=No+Image'
    );
  });
});
