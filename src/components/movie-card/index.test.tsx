import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useLocation } from 'wouter';

import { Movie } from '../../types/movie';
import MovieCard from './index';

vi.mock('wouter', () => ({
  useLocation: vi.fn(),
}));

describe('MovieCard', () => {
  const mockSetLocation = vi.fn();
  const mockMovie: Movie = {
    id: 1,
    title: 'Test Movie',
    overview: 'This is a test movie.',
    posterPath: null,
    backdropPath: '/test-backdrop.jpg',
    releaseDate: '2024-01-01',
    voteAverage: 8.5,
    voteCount: 1200,
  };

  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue([null, mockSetLocation]);
    vi.clearAllMocks();
  });

  it('renders the movie title and release date', () => {
    render(<MovieCard movie={mockMovie} />);

    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.releaseDate)).toBeInTheDocument();
  });

  it('renders the movie rating and vote count', () => {
    render(<MovieCard movie={mockMovie} />);

    expect(
      screen.getByText(mockMovie.voteAverage.toFixed(1))
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockMovie.voteCount} votes`)
    ).toBeInTheDocument();
  });

  it('renders the backdrop image', () => {
    render(<MovieCard movie={mockMovie} />);

    const img = screen.getByAltText(mockMovie.title) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain(
      `https://image.tmdb.org/t/p/w500${mockMovie.backdropPath}`
    );
  });

  it('renders a placeholder image if no backdrop is provided', () => {
    const movieWithoutBackdrop = { ...mockMovie, backdropPath: null };
    render(<MovieCard movie={movieWithoutBackdrop} />);

    const img = screen.getByAltText(mockMovie.title) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain(
      'https://via.placeholder.com/500x281?text=No+Image'
    );
  });

  it('navigates to the movie details page when clicked', () => {
    render(<MovieCard movie={mockMovie} />);

    const card = screen.getByText(mockMovie.title).closest('div');
    fireEvent.click(card!);

    expect(mockSetLocation).toHaveBeenCalledWith(`/movie/${mockMovie.id}`);
  });
});
