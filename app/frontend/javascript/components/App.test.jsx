import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

describe('App component', () => {
  beforeAll(() => {
    // Mock fetch for /products.json
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { id: 1, name: 'Product A' },
          { id: 2, name: 'Product B' },
          { id: 3, name: 'Product C' }
        ])
      })
    )
  })

  it('always shows the navigation bar', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('has a link to Home', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    const homeLink = screen.getByRole('link', { name: /home/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('has a link to Checkout', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    const checkoutLink = screen.getByRole('link', { name: /checkout/i })
    expect(checkoutLink).toBeInTheDocument()
    expect(checkoutLink).toHaveAttribute('href', '/checkout')
  })
})
