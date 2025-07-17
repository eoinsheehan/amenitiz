import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import CheckoutTotals from './CheckoutSummary'

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

      render(<CheckoutTotals />)

      await waitFor(() => {
        expect(document.getElementById('total-cost')).toHaveTextContent('€50')
      })
    })

    it('displays error message when checkout fails', async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({ ok: false })
      )

      render(<CheckoutTotals />)

      await waitFor(() => {
        expect(screen.getByText(/checkout failed/i)).toBeInTheDocument()
      })
    })
  })
})
