import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Catalogue from './Catalogue';

describe('Catalogue component', () => {
  beforeAll(() => {
    // Mock fetch for /products.json
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { id: 1, name: 'Product A' },
          { id: 2, name: 'Product B' },
          { id: 3, name: 'Product C' },
        ]),
      })
    );
  });

  it('renders the page title', async () => {
    render(
      <MemoryRouter>
        <Catalogue />
      </MemoryRouter>
    );

    expect(screen.getByText(/list of all blog products/i)).toBeInTheDocument();
  });

  it('renders three products', async () => {
    render(
      <MemoryRouter>
        <Catalogue />
      </MemoryRouter>
    );

    // Wait for product links to show up
    await waitFor(() => {
      expect(screen.getByText('Product A')).toBeInTheDocument();
      expect(screen.getByText('Product B')).toBeInTheDocument();
      expect(screen.getByText('Product C')).toBeInTheDocument();
    });
  });
});
