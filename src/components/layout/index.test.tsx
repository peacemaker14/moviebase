import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Layout from './';

vi.mock('../navbar', () => ({
  default: () => <div data-testid="navbar">Mocked Navbar</div>,
}));

describe('Layout', () => {
  it('renders the Navbar component', () => {
    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    );
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  it('renders the children content', () => {
    render(
      <Layout>
        <div data-testid="test-content">Test content</div>
      </Layout>
    );
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  it('applies correct CSS classes to the main container', () => {
    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    );
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('container mx-auto');
  });

  it('applies correct CSS classes to the outer div', () => {
    const { container } = render(
      <Layout>
        <div>Test content</div>
      </Layout>
    );
    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv).toHaveClass('bg-gray-50 min-h-screen p-6 w-screen');
  });
});
