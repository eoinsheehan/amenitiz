import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach, beforeAll } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import Checkout from './Checkout'

const mockCart = {
  items: [
    { code: 'ABC123', cost: 20, quantity: 2 },
    { code: 'XYZ789', cost: 10, quantity: 1 }
  ]
}

const mockResponse = {
  ...mockCart,
  total_cost: 50
}

let store = {}

beforeEach(() => {
  store = {}

  vi.stubGlobal('localStorage', {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = value }),
    removeItem: vi.fn((key) => { delete store[key] }),
    clear: vi.fn(() => { for (const key in store) delete store[key] })
  })

  // Mock CSRF token
  const meta = document.createElement('meta')
  meta.name = 'csrf-token'
  meta.content = 'fake-token'
  document.head.appendChild(meta)
})

afterEach(() => {
  vi.restoreAllMocks()
  document.head.innerHTML = ''
})

describe('Checkout component', () => {
  it('displays loading message initially', () => {
    localStorage.setItem('cart', JSON.stringify(mockCart))
    global.fetch = vi.fn(() => new Promise(() => {})) // unresolved promise
    render(<Checkout />)
    expect(screen.getByText(/processing checkout/i)).toBeInTheDocument()
  })

  it('displays "No items in checkout." when cart is empty and does not call fetch', async () => {
    localStorage.setItem('cart', JSON.stringify({ items: [] }))

    render(<Checkout />)

    await waitFor(() => {
      expect(screen.getByText('No items in checkout.')).toBeInTheDocument()
    })

    expect(document.getElementById('total-cost')).toHaveTextContent('$0')
    expect(fetch).not.toHaveBeenCalled()
  })

  describe('with a valid cart in localStorage', () => {
    beforeEach(() => {
      localStorage.setItem('cart', JSON.stringify(mockCart))
    })

    it('displays items and total when checkout succeeds', async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        })
      )

      render(<Checkout />)

      await waitFor(() => {
        expect(screen.getByText(/abc123/i)).toBeInTheDocument()
        expect(screen.getByText('$20')).toBeInTheDocument()
        expect(screen.getByText('2')).toBeInTheDocument()
        expect(screen.getByText(/xyz789/i)).toBeInTheDocument()
        expect(screen.getByText('$10')).toBeInTheDocument()
        expect(screen.getByText('1')).toBeInTheDocument()
        expect(document.getElementById('total-cost')).toHaveTextContent('$50')
      })
    })

    it('displays error message when checkout fails', async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({ ok: false })
      )

      render(<Checkout />)

      await waitFor(() => {
        expect(screen.getByText(/checkout failed/i)).toBeInTheDocument()
      })
    })
  })
})