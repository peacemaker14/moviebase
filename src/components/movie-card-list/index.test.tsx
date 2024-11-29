import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Movie } from '../../types/movie';
import MovieCardList from './index';

vi.mock('../movie-card', () => ({
  default: ({ movie }: { movie: Movie }) => (
    <div data-testid="movie-card">{movie.title}</div>
  ),
}));

describe('MovieCardList', () => {
  const mockMovies: Movie[] = [
    {
      id: 1,
      title: 'Movie 1',
      overview: '',
      posterPath: null,
      backdropPath: null,
      releaseDate: '2024-01-01',
      voteAverage: 8.5,
      voteCount: 100,
    },
    {
      id: 2,
      title: 'Movie 2',
      overview: '',
      posterPath: null,
      backdropPath: null,
      releaseDate: '2024-01-02',
      voteAverage: 7.8,
      voteCount: 200,
    },
  ];

  const mockOnPageChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = vi.fn();
  });

  it('renders the movie cards', () => {
    render(
      <MovieCardList
        movies={mockMovies}
        totalPages={5}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />
    );

    const movieCards = screen.getAllByTestId('movie-card');
    expect(movieCards).toHaveLength(mockMovies.length);
    expect(movieCards[0]).toHaveTextContent('Movie 1');
    expect(movieCards[1]).toHaveTextContent('Movie 2');
  });

  it('disables the "Previous" button on the first page', () => {
    render(
      <MovieCardList
        movies={mockMovies}
        totalPages={5}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />
    );

    const previousButton = screen.getByText('Previous');
    expect(previousButton).toBeDisabled();
    expect(previousButton).toHaveClass('cursor-not-allowed');
  });

  it('disables the "Next" button on the last page', () => {
    render(
      <MovieCardList
        movies={mockMovies}
        totalPages={5}
        currentPage={5}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
    expect(nextButton).toHaveClass('cursor-not-allowed');
  });

  it('calls onPageChange with the correct page number when "Next" is clicked', () => {
    render(
      <MovieCardList
        movies={mockMovies}
        totalPages={5}
        currentPage={3}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('calls onPageChange with the correct page number when "Previous" is clicked', () => {
    render(
      <MovieCardList
        movies={mockMovies}
        totalPages={5}
        currentPage={3}
        onPageChange={mockOnPageChange}
      />
    );

    const previousButton = screen.getByText('Previous');
    fireEvent.click(previousButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('displays the correct current page and total pages', () => {
    render(
      <MovieCardList
        movies={mockMovies}
        totalPages={5}
        currentPage={3}
        onPageChange={mockOnPageChange}
      />
    );

    const pageInfo = screen.getByText('Page 3 of 5');
    expect(pageInfo).toBeInTheDocument();
  });

  it('scrolls to the top when the page changes', () => {
    const { rerender } = render(
      <MovieCardList
        movies={mockMovies}
        totalPages={5}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />
    );

    rerender(
      <MovieCardList
        movies={mockMovies}
        totalPages={5}
        currentPage={2}
        onPageChange={mockOnPageChange}
      />
    );

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'instant',
    });
  });
});
