import { render, screen } from '@testing-library/react';

import CategoryPageContainer from './index';

describe('CategoryPageContainer', () => {
  it('renders the title correctly', () => {
    const title = 'Test Title';
    render(
      <CategoryPageContainer title={title}>
        <p>Test Content</p>
      </CategoryPageContainer>
    );

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('text-2xl font-bold mb-6 text-slate-900');
  });

  it('renders the children correctly', () => {
    const content = 'Test Content';
    render(
      <CategoryPageContainer title="Test Title">
        <p>{content}</p>
      </CategoryPageContainer>
    );

    const contentElement = screen.getByText(content);
    expect(contentElement).toBeInTheDocument();
  });

  it('applies the correct container styling', () => {
    render(
      <CategoryPageContainer title="Styled Test">
        <p>Styled Content</p>
      </CategoryPageContainer>
    );

    const containerElement = screen.getByText('Styled Content').parentElement;
    expect(containerElement).toHaveClass('pt-20');
  });
});
