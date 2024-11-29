import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useUpcomingMovies } from '../../hooks/movie';
import { Movie } from '../../types/movie';
import UpcomingPage from './';

// Mock the custom hook
vi.mock('../../hooks/movie', () => ({
  useUpcomingMovies: vi.fn(),
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

describe('UpcomingPage', () => {
  it('renders loading state', () => {
    vi.mocked(useUpcomingMovies).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<UpcomingPage />);
    expect(screen.getByText('Loading movies...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    vi.mocked(useUpcomingMovies).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<UpcomingPage />);
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

    vi.mocked(useUpcomingMovies).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    render(<UpcomingPage />);

    expect(screen.getByTestId('category-page-container')).toBeInTheDocument();
    expect(screen.getByText('Upcoming Movies')).toBeInTheDocument();
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

    vi.mocked(useUpcomingMovies).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    render(<UpcomingPage />);

    const nextPageButton = screen.getByText('Next Page');
    fireEvent.click(nextPageButton);

    // Check if useUpcomingMovies was called with the updated page number
    expect(useUpcomingMovies).toHaveBeenCalledWith(2);
  });

  it('renders null when data is not available', () => {
    vi.mocked(useUpcomingMovies).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    render(<UpcomingPage />);

    expect(screen.getByTestId('category-page-container')).toBeInTheDocument();
    expect(screen.getByText('Upcoming Movies')).toBeInTheDocument();
    expect(screen.queryByTestId('movie-card-list')).not.toBeInTheDocument();
  });
});
