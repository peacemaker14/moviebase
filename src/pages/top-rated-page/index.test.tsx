import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useTopRatedMovies } from '../../hooks/movie';
import { Movie } from '../../types/movie';
import TopRatedPage from './';

// Mock the custom hook
vi.mock('../../hooks/movie', () => ({
  useTopRatedMovies: vi.fn(),
}));

// Mock the components
vi.mock('../../components/category-page-container', () => ({
  default: ({
    children,
    title,
  }: {
    children: React.ReactNode;
    title: string;
  }) => (
    <div data-testid="category-page-container">
      <h1>{title}</h1>
      {children}
    </div>
  ),
}));

vi.mock('../../components/movie-card-list', () => ({
  default: ({
    movies,
    totalPages,
    currentPage,
    onPageChange,
  }: {
    movies: Movie[];
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
  }) => (
    <div data-testid="movie-card-list">
      <p>Movies: {movies.length}</p>
      <p>Total Pages: {totalPages}</p>
      <p>Current Page: {currentPage}</p>
      <button onClick={() => onPageChange(currentPage + 1)}>Next Page</button>
    </div>
  ),
}));

describe('TopRatedPage', () => {
  it('renders loading state', () => {
    vi.mocked(useTopRatedMovies).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<TopRatedPage />);
    expect(screen.getByText('Loading movies...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    vi.mocked(useTopRatedMovies).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<TopRatedPage />);
    expect(screen.getByText('Error loading movies.')).toBeInTheDocument();
  });

  it('renders movies when data is available', () => {
    const mockData = {
      results: [
        { id: 1, title: 'Movie 1' },
        { id: 2, title: 'Movie 2' },
      ],
      totalPages: 10,
    };

    vi.mocked(useTopRatedMovies).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    render(<TopRatedPage />);

    expect(screen.getByTestId('category-page-container')).toBeInTheDocument();
    expect(screen.getByText('Top Rated Movies')).toBeInTheDocument();
    expect(screen.getByTestId('movie-card-list')).toBeInTheDocument();
    expect(screen.getByText('Movies: 2')).toBeInTheDocument();
    expect(screen.getByText('Total Pages: 10')).toBeInTheDocument();
    expect(screen.getByText('Current Page: 1')).toBeInTheDocument();
  });

  it('updates page number when next page is clicked', () => {
    const mockData = {
      results: [
        { id: 1, title: 'Movie 1' },
        { id: 2, title: 'Movie 2' },
      ],
      totalPages: 10,
    };

    vi.mocked(useTopRatedMovies).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    render(<TopRatedPage />);

    const nextPageButton = screen.getByText('Next Page');
    fireEvent.click(nextPageButton);

    // Check if useTopRatedMovies was called with the updated page number
    expect(useTopRatedMovies).toHaveBeenCalledWith(2);
  });

  it('renders null when data is not available', () => {
    vi.mocked(useTopRatedMovies).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    render(<TopRatedPage />);

    expect(screen.getByTestId('category-page-container')).toBeInTheDocument();
    expect(screen.getByText('Top Rated Movies')).toBeInTheDocument();
    expect(screen.queryByTestId('movie-card-list')).not.toBeInTheDocument();
  });
});
