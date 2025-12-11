import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './page';

describe('Home', () => {
  it('renders the main heading', () => {
    render(<Home />);
    expect(
      screen.getByRole('link', { name: /deploy now/i })
    ).toBeInTheDocument();
  });
});
