import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useSearchMovies } from '../../hooks/movie';
import SearchMovie from './index';

// Mock `useSearchMovies`
vi.mock('../../hooks/movie', () => ({
  useSearchMovies: vi.fn(),
}));

describe('SearchMovie', () => {
  beforeEach(() => {
    (useSearchMovies as jest.Mock).mockReturnValue({
      data: { results: [] },
      isLoading: false,
    });
  });

  it('renders the search input field', () => {
    render(<SearchMovie />);
    const input = screen.getByPlaceholderText('What are you looking for?');
    expect(input).toBeInTheDocument();
  });

  it('displays loading state when searching', async () => {
    (useSearchMovies as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(<SearchMovie />);

    const input = screen.getByPlaceholderText('What are you looking for?');
    fireEvent.change(input, { target: { value: 'Test' } });

    await waitFor(() => {
      expect(screen.getByText('Loading results...')).toBeInTheDocument();
    });
  });
});
