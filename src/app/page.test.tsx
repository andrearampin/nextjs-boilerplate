import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './page';

function renderWithQueryClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe('Home', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders input and button', () => {
    renderWithQueryClient(<Home />);
    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('shows loading state when submitting', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(
      () => new Promise(() => {})
    );

    renderWithQueryClient(<Home />);

    await userEvent.type(screen.getByPlaceholderText(/enter your name/i), 'John');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays success message on successful response', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Welcome John!' }),
    } as Response);

    renderWithQueryClient(<Home />);

    await userEvent.type(screen.getByPlaceholderText(/enter your name/i), 'John');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      const message = screen.getByText('Welcome John!');
      expect(message).toBeInTheDocument();
      expect(message.tagName).toBe('H1');
    });
  });

  it('displays error message in red on error response', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Name is required' }),
    } as Response);

    renderWithQueryClient(<Home />);

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      const errorMessage = screen.getByText('Name is required');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveClass('text-red-600');
    });
  });
});
