import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useLocation } from 'wouter';

import Navbar from '.';

// Mock the wouter library
vi.mock('wouter', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
  useLocation: vi.fn(),
}));

// Mock the SearchMovie component
vi.mock('../search-movie', () => ({
  default: () => <div data-testid="search-movie">Search Movie Component</div>,
}));

describe('Navbar', () => {
  it('renders the logo', () => {
    vi.mocked(useLocation).mockReturnValue(['/']);
    render(<Navbar />);
    expect(screen.getByText('MovieBase')).toBeInTheDocument();
  });

  it('renders all categories', () => {
    vi.mocked(useLocation).mockReturnValue(['/']);
    render(<Navbar />);
    expect(screen.getByText('Now Playing')).toBeInTheDocument();
    expect(screen.getByText('Popular')).toBeInTheDocument();
    expect(screen.getByText('Top Rated')).toBeInTheDocument();
    expect(screen.getByText('Upcoming')).toBeInTheDocument();
  });

  it('applies active class to current route', () => {
    vi.mocked(useLocation).mockReturnValue(['/popular']);
    render(<Navbar />);
    const activeLink = screen.getByText('Popular');
    expect(activeLink.className).toContain('bg-stone-100');
  });

  it('does not apply active class to non-active routes', () => {
    vi.mocked(useLocation).mockReturnValue(['/popular']);
    render(<Navbar />);
    const nonActiveLink = screen.getByText('Now Playing');
    expect(nonActiveLink.className).not.toContain('bg-stone-100');
  });

  it('renders the SearchMovie component', () => {
    vi.mocked(useLocation).mockReturnValue(['/']);
    render(<Navbar />);
    expect(screen.getByTestId('search-movie')).toBeInTheDocument();
  });
});
